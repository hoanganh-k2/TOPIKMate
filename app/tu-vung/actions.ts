"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";
import { nextSrsState, type ReviewResult } from "@/lib/srs";

/**
 * Đánh dấu một từ vựng là "đã thuộc" hoặc "cần ôn".
 * Trả về { ok } — nếu chưa đăng nhập thì { ok: false, reason: "auth" }.
 */
export async function markVocab(vocabId: string, result: ReviewResult) {
  const user = await getCurrentUser();
  if (!user?.id) return { ok: false as const, reason: "auth" as const };
  if (!vocabId) return { ok: false as const, reason: "input" as const };

  const existing = await prisma.vocabReview.findUnique({
    where: { userId_vocabId: { userId: user.id, vocabId } },
    select: { box: true },
  });

  const state = nextSrsState(existing, result);

  await prisma.vocabReview.upsert({
    where: { userId_vocabId: { userId: user.id, vocabId } },
    create: { userId: user.id, vocabId, box: state.box, dueAt: state.dueAt },
    update: { box: state.box, dueAt: state.dueAt },
  });

  revalidatePath("/tu-vung");
  return { ok: true as const, box: state.box };
}

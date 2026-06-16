"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { saveUpload } from "@/lib/upload";

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}
function num(v: FormDataEntryValue | null, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/* ---------------- ĐỀ THI ---------------- */

export async function createExam(formData: FormData) {
  await requireAdmin();
  const title = str(formData.get("title"));
  if (!title) throw new Error("Tên đề không được để trống.");
  const targetLevelRaw = str(formData.get("targetLevel"));
  const exam = await prisma.exam.create({
    data: {
      title,
      targetLevel: targetLevelRaw ? num(formData.get("targetLevel"), 0) || null : null,
      description: str(formData.get("description")) || null,
    },
  });
  revalidatePath("/admin/de-thi");
  redirect(`/admin/de-thi/${exam.id}`);
}

export async function updateExam(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  const targetLevelRaw = str(formData.get("targetLevel"));
  await prisma.exam.update({
    where: { id: examId },
    data: {
      title: str(formData.get("title")),
      targetLevel: targetLevelRaw ? num(formData.get("targetLevel"), 0) || null : null,
      description: str(formData.get("description")) || null,
    },
  });
  revalidatePath(`/admin/de-thi/${examId}`);
  revalidatePath("/admin/de-thi");
}

export async function deleteExam(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  await prisma.exam.delete({ where: { id: examId } });
  revalidatePath("/admin/de-thi");
}

/* ---------------- PHẦN THI ---------------- */

export async function addSection(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  const count = await prisma.section.count({ where: { examId } });
  await prisma.section.create({
    data: {
      examId,
      type: str(formData.get("type")) || "READING",
      durationSec: num(formData.get("durationMin"), 10) * 60,
      order: count + 1,
    },
  });
  revalidatePath(`/admin/de-thi/${examId}`);
}

export async function deleteSection(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  await prisma.section.delete({ where: { id: str(formData.get("sectionId")) } });
  revalidatePath(`/admin/de-thi/${examId}`);
}

/* ---------------- CÂU HỎI ---------------- */

export async function addQuestion(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  const sectionId = str(formData.get("sectionId"));
  const type = str(formData.get("type")) || "MULTIPLE_CHOICE";
  const prompt = str(formData.get("prompt"));
  if (!prompt) throw new Error("Đề bài (prompt) không được để trống.");

  const imageUrl = await saveUpload(formData.get("image") as File | null, "image");
  const audioUrl = await saveUpload(formData.get("audio") as File | null, "audio");

  const count = await prisma.question.count({ where: { sectionId } });

  // Đáp án: 4 ô content + chỉ số đáp án đúng (correct = "1".."4")
  const correct = str(formData.get("correct"));
  const choices: { label: string; content: string; isCorrect: boolean }[] = [];
  if (type === "MULTIPLE_CHOICE") {
    for (let i = 1; i <= 4; i++) {
      const content = str(formData.get(`choice${i}`));
      if (content) {
        choices.push({ label: String(i), content, isCorrect: correct === String(i) });
      }
    }
    if (choices.length < 2) throw new Error("Cần ít nhất 2 đáp án.");
    if (!choices.some((c) => c.isCorrect)) throw new Error("Hãy chọn một đáp án đúng.");
  }

  await prisma.question.create({
    data: {
      sectionId,
      type,
      order: count + 1,
      prompt,
      passage: str(formData.get("passage")) || null,
      points: num(formData.get("points"), 2),
      explanation: str(formData.get("explanation")) || null,
      topic: str(formData.get("topic")) || null,
      imageUrl,
      audioUrl,
      choices: choices.length ? { create: choices } : undefined,
    },
  });
  revalidatePath(`/admin/de-thi/${examId}`);
}

export async function deleteQuestion(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  await prisma.question.delete({ where: { id: str(formData.get("questionId")) } });
  revalidatePath(`/admin/de-thi/${examId}`);
}

/* ---------------- TỪ VỰNG ---------------- */

export async function createVocab(formData: FormData) {
  await requireAdmin();
  const korean = str(formData.get("korean"));
  const meaningVi = str(formData.get("meaningVi"));
  if (!korean || !meaningVi) throw new Error("Cần nhập từ tiếng Hàn và nghĩa tiếng Việt.");
  await prisma.vocab.create({
    data: {
      level: num(formData.get("level"), 3),
      korean,
      reading: str(formData.get("reading")) || null,
      meaningVi,
      example: str(formData.get("example")) || null,
      topic: str(formData.get("topic")) || null,
    },
  });
  revalidatePath("/admin/tu-vung");
  revalidatePath("/tu-vung");
}

export async function deleteVocab(formData: FormData) {
  await requireAdmin();
  await prisma.vocab.delete({ where: { id: str(formData.get("vocabId")) } });
  revalidatePath("/admin/tu-vung");
  revalidatePath("/tu-vung");
}

/* ---------------- NGỮ PHÁP ---------------- */

export async function createGrammar(formData: FormData) {
  await requireAdmin();
  const pattern = str(formData.get("pattern"));
  const meaningVi = str(formData.get("meaningVi"));
  if (!pattern || !meaningVi) throw new Error("Cần nhập mẫu ngữ pháp và ý nghĩa.");
  await prisma.grammar.create({
    data: {
      level: num(formData.get("level"), 3),
      pattern,
      meaningVi,
      example: str(formData.get("example")) || null,
    },
  });
  revalidatePath("/admin/ngu-phap");
  revalidatePath("/ngu-phap");
}

export async function deleteGrammar(formData: FormData) {
  await requireAdmin();
  await prisma.grammar.delete({ where: { id: str(formData.get("grammarId")) } });
  revalidatePath("/admin/ngu-phap");
  revalidatePath("/ngu-phap");
}

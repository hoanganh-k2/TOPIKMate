import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-helpers";
import { isDue } from "@/lib/srs";
import { Card, CardContent } from "@/components/ui/card";
import { VocabStudy } from "@/components/vocab-study";

export const dynamic = "force-dynamic";

export default async function VocabPage() {
  const items = await prisma.vocab.findMany({
    orderBy: [{ level: "asc" }, { korean: "asc" }],
  });

  const user = await getCurrentUser();
  const reviews = user?.id
    ? await prisma.vocabReview.findMany({
        where: { userId: user.id },
        select: { vocabId: true, box: true, dueAt: true },
      })
    : [];

  const now = new Date();
  const reviewMap: Record<string, { box: number; due: boolean }> = {};
  for (const r of reviews) {
    reviewMap[r.vocabId] = { box: r.box, due: isDue(r.dueAt, now) };
  }
  // Từ chưa học lần nào cũng coi là "cần ôn" (đến hạn).
  const dueCount = items.filter(
    (i) => !reviewMap[i.id] || reviewMap[i.id].due
  ).length;

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Từ vựng TOPIK</h1>
        <p className="mt-2 text-muted-foreground">
          Học bằng flashcard, đánh dấu “đã thuộc / cần ôn” và để hệ thống nhắc ôn lại đúng lúc.
        </p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Chưa có từ vựng. Chạy <code className="rounded bg-muted px-1.5 py-0.5">npm run db:seed</code> để nạp dữ liệu mẫu.
          </CardContent>
        </Card>
      ) : (
        <VocabStudy
          items={items}
          reviewMap={reviewMap}
          dueCount={dueCount}
          loggedIn={!!user?.id}
        />
      )}
    </div>
  );
}

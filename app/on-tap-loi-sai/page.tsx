import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PracticeRunner } from "@/components/practice-runner";

export const dynamic = "force-dynamic";

export default async function MistakesPage() {
  const session = await auth();
  if (!session?.user) redirect("/dang-nhap?callbackUrl=/on-tap-loi-sai");
  const userId = (session.user as { id?: string }).id!;

  // Các câu trắc nghiệm từng làm sai, lấy lần gần nhất trước (để khử trùng theo câu).
  const wrong = await prisma.attemptAnswer.findMany({
    where: {
      isCorrect: false,
      attempt: { userId },
      question: { type: "MULTIPLE_CHOICE" },
    },
    orderBy: { attempt: { startedAt: "desc" } },
    include: {
      question: {
        include: { choices: true, section: { select: { type: true } } },
      },
    },
  });

  // Khử trùng: mỗi câu hỏi chỉ giữ một lần (lần gần nhất do đã sort desc).
  const seen = new Set<string>();
  const items = [];
  for (const a of wrong) {
    if (seen.has(a.questionId)) continue;
    seen.add(a.questionId);
    const q = a.question;
    items.push({
      id: q.id,
      prompt: q.prompt,
      passage: q.passage,
      audioUrl: q.audioUrl,
      imageUrl: q.imageUrl,
      explanation: q.explanation,
      topic: q.topic,
      sectionType: q.section.type as "LISTENING" | "READING" | "WRITING",
      choices: q.choices.map((c) => ({
        id: c.id,
        label: c.label,
        content: c.content,
        isCorrect: c.isCorrect,
      })),
    });
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sổ tay lỗi sai</h1>
        <p className="mt-2 text-muted-foreground">
          Luyện lại những câu trắc nghiệm bạn từng làm sai trong các bài thi thử, xem đáp án và
          giải thích ngay.
        </p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <p>Bạn chưa có câu sai nào — hãy làm một bài thi thử trước nhé! 🎯</p>
            <Button asChild className="mt-4">
              <Link href="/thi-thu">Bắt đầu thi thử</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <PracticeRunner items={items} />
      )}
    </div>
  );
}

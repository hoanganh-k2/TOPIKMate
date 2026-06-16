import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { PracticeRunner } from "@/components/practice-runner";

export const dynamic = "force-dynamic";

export default async function PracticePage() {
  const questions = await prisma.question.findMany({
    where: { type: "MULTIPLE_CHOICE" },
    include: { choices: true, section: { select: { type: true } } },
    orderBy: { order: "asc" },
  });

  const items = questions.map((q) => ({
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
  }));

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Luyện tập theo dạng</h1>
        <p className="mt-2 text-muted-foreground">
          Luyện từng câu không giới hạn thời gian, xem đáp án và giải thích ngay sau khi trả lời.
        </p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Chưa có câu hỏi nào. Chạy <code className="rounded bg-muted px-1.5 py-0.5">npm run db:seed</code> để nạp dữ liệu mẫu.
          </CardContent>
        </Card>
      ) : (
        <PracticeRunner items={items} />
      )}
    </div>
  );
}

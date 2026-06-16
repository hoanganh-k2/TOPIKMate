import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExamRunner } from "@/components/exam-runner";

export const dynamic = "force-dynamic";

export default async function ExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const session = await auth();

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          questions: {
            orderBy: { order: "asc" },
            include: { choices: true },
          },
        },
      },
    },
  });

  if (!exam) notFound();

  if (!session?.user) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Cần đăng nhập</CardTitle>
            <CardDescription>
              Bạn cần đăng nhập để làm bài thi và lưu kết quả.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-3">
            <Button asChild>
              <Link href={`/dang-nhap?callbackUrl=/thi-thu/${examId}`}>Đăng nhập</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dang-ky">Đăng ký</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Bỏ thông tin đáp án đúng trước khi gửi xuống client (chấm điểm ở server).
  const safeExam = {
    id: exam.id,
    title: exam.title,
    targetLevel: exam.targetLevel,
    sections: exam.sections.map((s) => ({
      id: s.id,
      type: s.type,
      durationSec: s.durationSec,
      questions: s.questions.map((q) => ({
        id: q.id,
        order: q.order,
        type: q.type,
        prompt: q.prompt,
        passage: q.passage,
        audioUrl: q.audioUrl,
        imageUrl: q.imageUrl,
        choices: q.choices.map((c) => ({ id: c.id, label: c.label, content: c.content })),
      })),
    })),
  };

  return <ExamRunner exam={safeExam} />;
}

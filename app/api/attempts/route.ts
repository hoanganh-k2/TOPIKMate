import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { gradeAttempt, type SubmittedAnswer } from "@/lib/scoring";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Bạn cần đăng nhập." }, { status: 401 });
  }
  const userId = (session.user as { id?: string }).id;
  if (!userId) {
    return NextResponse.json({ error: "Phiên đăng nhập không hợp lệ." }, { status: 401 });
  }

  const { examId, answers } = (await req.json()) as {
    examId: string;
    answers: SubmittedAnswer[];
  };

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: { sections: { include: { questions: { include: { choices: true } } } } },
  });
  if (!exam) {
    return NextResponse.json({ error: "Không tìm thấy đề thi." }, { status: 404 });
  }

  const questions = exam.sections.flatMap((s) => s.questions);
  const { score, maxScore, graded } = gradeAttempt(questions, answers ?? []);

  const attempt = await prisma.attempt.create({
    data: {
      userId,
      examId,
      submittedAt: new Date(),
      score,
      maxScore,
      answers: {
        create: graded.map((g) => ({
          questionId: g.questionId,
          choiceId: g.choiceId,
          textAnswer: g.textAnswer,
          isCorrect: g.isCorrect,
        })),
      },
    },
  });

  return NextResponse.json({ attemptId: attempt.id, score, maxScore });
}

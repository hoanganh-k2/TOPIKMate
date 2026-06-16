import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { gradeAttempt, type SubmittedAnswer } from "@/lib/scoring";
import { gradeWriting } from "@/lib/writing-grader";

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
  const questionById = new Map(questions.map((q) => [q.id, q]));
  const { score, maxScore, graded } = gradeAttempt(questions, answers ?? []);

  // Chấm các câu Viết bằng AI (song song). Mỗi câu Viết cộng `points` vào maxScore,
  // điểm AI cộng vào score. Nếu không chấm được (thiếu key/lỗi) thì giữ nguyên.
  const aiByQuestion = new Map<string, { aiScore: number; aiFeedback: string }>();
  let extraScore = 0;
  let extraMax = 0;

  const writingGraded = graded.filter((g) => {
    const q = questionById.get(g.questionId);
    return q?.type === "WRITING";
  });

  await Promise.all(
    writingGraded.map(async (g) => {
      const q = questionById.get(g.questionId)!;
      extraMax += q.points;
      const grade = await gradeWriting({
        prompt: q.prompt,
        answer: g.textAnswer ?? "",
        maxScore: q.points,
      });
      if (grade) {
        extraScore += grade.score;
        aiByQuestion.set(g.questionId, {
          aiScore: grade.score,
          aiFeedback: JSON.stringify({
            strengths: grade.strengths,
            weaknesses: grade.weaknesses,
            suggestion: grade.suggestion,
          }),
        });
      }
    })
  );

  const finalScore = score + extraScore;
  const finalMax = maxScore + extraMax;

  const attempt = await prisma.attempt.create({
    data: {
      userId,
      examId,
      submittedAt: new Date(),
      score: finalScore,
      maxScore: finalMax,
      answers: {
        create: graded.map((g) => {
          const ai = aiByQuestion.get(g.questionId);
          return {
            questionId: g.questionId,
            choiceId: g.choiceId,
            textAnswer: g.textAnswer,
            isCorrect: g.isCorrect,
            aiScore: ai?.aiScore ?? null,
            aiFeedback: ai?.aiFeedback ?? null,
          };
        }),
      },
    },
  });

  return NextResponse.json({
    attemptId: attempt.id,
    score: finalScore,
    maxScore: finalMax,
  });
}

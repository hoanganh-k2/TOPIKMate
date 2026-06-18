import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2, XCircle, Circle } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, SECTION_LABEL, topikLevelFromPercent } from "@/lib/utils";
import { RichText } from "@/components/rich-text";

export const dynamic = "force-dynamic";

interface WritingFeedback {
  strengths?: string;
  weaknesses?: string;
  suggestion?: string;
}

function parseFeedback(raw: string | null | undefined): WritingFeedback | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as WritingFeedback;
  } catch {
    return null;
  }
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ examId: string; attemptId: string }>;
}) {
  const { examId, attemptId } = await params;
  const session = await auth();
  if (!session?.user) redirect(`/dang-nhap?callbackUrl=/thi-thu/${examId}`);
  const userId = (session.user as { id?: string }).id;

  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: { answers: true },
  });
  if (!attempt || attempt.userId !== userId) notFound();

  const exam = await prisma.exam.findUnique({
    where: { id: examId },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: { questions: { orderBy: { order: "asc" }, include: { choices: true } } },
      },
    },
  });
  if (!exam) notFound();

  const answerByQ = new Map(attempt.answers.map((a) => [a.questionId, a]));
  const percent = attempt.maxScore > 0 ? Math.round((attempt.score / attempt.maxScore) * 100) : 0;
  const topikLevel = topikLevelFromPercent(percent);

  return (
    <div className="container max-w-4xl py-12">
      {/* Tổng điểm */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-hero p-8 text-center">
          <p className="text-sm font-medium text-muted-foreground">Kết quả bài thi</p>
          <h1 className="mt-1 text-2xl font-bold">{exam.title}</h1>
          <div className="mt-4 text-5xl font-bold text-primary">
            {attempt.score}
            <span className="text-2xl text-muted-foreground"> / {attempt.maxScore} điểm</span>
          </div>
          <p className="mt-2 text-muted-foreground">Đạt {percent}% tổng điểm</p>
          <div className="mt-3 flex justify-center">
            <Badge variant={topikLevel.level ? "default" : "outline"} className="text-sm">
              Trình độ ước tính: {topikLevel.label}
            </Badge>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild variant="outline">
              <Link href="/thi-thu">Đề thi khác</Link>
            </Button>
            <Button asChild>
              <Link href="/tai-khoan">Xem tiến độ</Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Xem lại từng câu */}
      <h2 className="mb-4 text-xl font-bold">Xem lại đáp án</h2>
      <div className="space-y-8">
        {exam.sections.map((section) => (
          <div key={section.id}>
            <Badge variant="accent" className="mb-3">
              {SECTION_LABEL[section.type]}
            </Badge>
            <div className="space-y-4">
              {section.questions.map((question, idx) => {
                const ans = answerByQ.get(question.id);
                const isWriting = question.type === "WRITING";
                return (
                  <Card key={question.id}>
                    <CardHeader className="flex-row items-start gap-3 space-y-0">
                      {isWriting ? (
                        <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                      ) : ans?.isCorrect ? (
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
                      ) : (
                        <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
                      )}
                      <CardTitle className="font-kr text-lg font-medium leading-relaxed">
                        <span className="text-muted-foreground">Câu {idx + 1}. </span>
                        <RichText text={question.prompt} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {question.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={question.imageUrl} alt="Hình minh hoạ" className="max-h-60 rounded-lg border" />
                      )}
                      {question.audioUrl && (
                        <audio controls className="w-full">
                          <source src={question.audioUrl} />
                        </audio>
                      )}
                      {question.passage && (
                        <div className="whitespace-pre-line rounded-lg bg-muted/60 p-3 font-kr text-base leading-relaxed">
                          <RichText text={question.passage} />
                        </div>
                      )}

                      {isWriting ? (
                        <div className="space-y-3">
                          <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                            <p className="mb-1 font-medium">Câu trả lời của bạn:</p>
                            <p className="whitespace-pre-line text-muted-foreground">
                              {ans?.textAnswer || "(Chưa trả lời)"}
                            </p>
                          </div>
                          {(() => {
                            const fb = parseFeedback(ans?.aiFeedback);
                            if (ans?.aiScore == null && !fb) {
                              return (
                                <p className="text-xs text-muted-foreground">
                                  * Phần Viết chưa được chấm bằng AI (chưa cấu hình GROQ_API_KEY) — cần tự đánh giá hoặc giáo viên chấm.
                                </p>
                              );
                            }
                            return (
                              <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm">
                                <div className="flex items-center gap-2">
                                  <Badge>AI chấm</Badge>
                                  {ans?.aiScore != null && (
                                    <span className="font-semibold">
                                      {ans.aiScore} / {question.points} điểm
                                    </span>
                                  )}
                                </div>
                                {fb?.strengths && (
                                  <p><span className="font-medium text-emerald-600">Điểm mạnh: </span>{fb.strengths}</p>
                                )}
                                {fb?.weaknesses && (
                                  <p><span className="font-medium text-amber-600">Cần cải thiện: </span>{fb.weaknesses}</p>
                                )}
                                {fb?.suggestion && (
                                  <p><span className="font-medium text-primary">Gợi ý: </span>{fb.suggestion}</p>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {question.choices.map((c) => {
                            const chosen = ans?.choiceId === c.id;
                            return (
                              <div
                                key={c.id}
                                className={cn(
                                  "flex items-start gap-2 rounded-lg border p-2.5 text-sm",
                                  c.isCorrect && "border-primary bg-accent",
                                  chosen && !c.isCorrect && "border-destructive bg-destructive/10"
                                )}
                              >
                                <span className="font-semibold">{c.label}.</span>
                                <span className="flex-1">{c.content}</span>
                                {c.isCorrect && (
                                  <Badge className="shrink-0">Đáp án đúng</Badge>
                                )}
                                {chosen && !c.isCorrect && (
                                  <Badge variant="destructive" className="shrink-0">
                                    Bạn chọn
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {question.explanation && (
                        <div className="rounded-lg bg-primary/5 p-3 text-sm">
                          <span className="font-medium text-primary">Giải thích: </span>
                          {question.explanation}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

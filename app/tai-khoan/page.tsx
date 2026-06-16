import Link from "next/link";
import { redirect } from "next/navigation";
import { Trophy, FileText, TrendingUp } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreChart, type ScorePoint } from "@/components/score-chart";
import { SECTION_LABEL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/dang-nhap?callbackUrl=/tai-khoan");
  const userId = (session.user as { id?: string }).id!;

  const attempts = await prisma.attempt.findMany({
    where: { userId },
    orderBy: { startedAt: "desc" },
    include: {
      exam: { select: { title: true, targetLevel: true } },
      answers: { include: { question: { include: { section: true } } } },
    },
  });

  const totalAttempts = attempts.length;
  const bestPercent = attempts.reduce((best, a) => {
    const p = a.maxScore > 0 ? (a.score / a.maxScore) * 100 : 0;
    return Math.max(best, p);
  }, 0);
  const avgPercent =
    totalAttempts > 0
      ? attempts.reduce(
          (sum, a) => sum + (a.maxScore > 0 ? (a.score / a.maxScore) * 100 : 0),
          0
        ) / totalAttempts
      : 0;

  // Dữ liệu biểu đồ: theo thứ tự thời gian tăng dần.
  const chartData: ScorePoint[] = [...attempts]
    .filter((a) => a.maxScore > 0)
    .reverse()
    .map((a) => ({
      label: new Date(a.startedAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      }),
      percent: Math.round((a.score / a.maxScore) * 100),
    }));

  // Phân tích điểm mạnh/yếu theo phần (Nghe/Đọc) và theo dạng câu (topic) —
  // chỉ tính câu trắc nghiệm (có đúng/sai).
  const sectionStats: Record<string, { correct: number; total: number }> = {};
  const topicStats: Record<string, { correct: number; total: number }> = {};
  for (const a of attempts) {
    for (const ans of a.answers) {
      if (ans.question.type === "WRITING") continue;
      const sType = ans.question.section.type;
      const s = (sectionStats[sType] ??= { correct: 0, total: 0 });
      s.total++;
      if (ans.isCorrect) s.correct++;
      const topic = ans.question.topic;
      if (topic) {
        const t = (topicStats[topic] ??= { correct: 0, total: 0 });
        t.total++;
        if (ans.isCorrect) t.correct++;
      }
    }
  }
  const sectionRows = Object.entries(sectionStats).map(([type, v]) => ({
    label: SECTION_LABEL[type] ?? type,
    percent: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
    correct: v.correct,
    total: v.total,
  }));
  const topicRows = Object.entries(topicStats)
    .map(([topic, v]) => ({
      label: topic,
      percent: v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0,
      correct: v.correct,
      total: v.total,
    }))
    .sort((a, b) => a.percent - b.percent); // yếu nhất lên đầu

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Xin chào, {session.user.name || "bạn"} 👋</h1>
        <p className="mt-2 text-muted-foreground">Theo dõi tiến độ ôn luyện của bạn.</p>
      </div>

      {/* Thống kê */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <FileText className="size-6" />
            </span>
            <div>
              <p className="text-2xl font-bold">{totalAttempts}</p>
              <p className="text-sm text-muted-foreground">Bài thi đã làm</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <Trophy className="size-6" />
            </span>
            <div>
              <p className="text-2xl font-bold">{Math.round(bestPercent)}%</p>
              <p className="text-sm text-muted-foreground">Điểm cao nhất</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <TrendingUp className="size-6" />
            </span>
            <div>
              <p className="text-2xl font-bold">{Math.round(avgPercent)}%</p>
              <p className="text-sm text-muted-foreground">Điểm trung bình</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Biểu đồ điểm theo thời gian */}
      {chartData.length >= 2 && (
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Điểm theo thời gian</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreChart data={chartData} />
          </CardContent>
        </Card>
      )}

      {/* Điểm mạnh / yếu */}
      {(sectionRows.length > 0 || topicRows.length > 0) && (
        <div className="mb-10 grid gap-4 lg:grid-cols-2">
          {sectionRows.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Tỉ lệ đúng theo phần</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sectionRows.map((r) => (
                  <div key={r.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{r.label}</span>
                      <span className="text-muted-foreground">
                        {r.correct}/{r.total} ({r.percent}%)
                      </span>
                    </div>
                    <Progress value={r.percent} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          {topicRows.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Theo dạng câu (yếu nhất trước)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topicRows.slice(0, 8).map((r) => (
                  <div key={r.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{r.label}</span>
                      <span className="text-muted-foreground">
                        {r.correct}/{r.total} ({r.percent}%)
                      </span>
                    </div>
                    <Progress value={r.percent} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Lịch sử */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử bài thi</CardTitle>
        </CardHeader>
        <CardContent>
          {attempts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>Bạn chưa làm bài thi nào.</p>
              <Button asChild className="mt-4">
                <Link href="/thi-thu">Bắt đầu thi thử</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {attempts.map((a) => {
                const percent = a.maxScore > 0 ? Math.round((a.score / a.maxScore) * 100) : 0;
                return (
                  <Link
                    key={a.id}
                    href={`/thi-thu/${a.examId}/ket-qua/${a.id}`}
                    className="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{a.exam.title}</span>
                        {a.exam.targetLevel && (
                          <Badge variant="secondary">Cấp {a.exam.targetLevel}</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(a.startedAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={percent} className="flex-1" />
                      <span className="w-28 text-right text-sm font-medium">
                        {a.score}/{a.maxScore} ({percent}%)
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

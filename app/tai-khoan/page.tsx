import Link from "next/link";
import { redirect } from "next/navigation";
import { Trophy, FileText, TrendingUp } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/dang-nhap?callbackUrl=/tai-khoan");
  const userId = (session.user as { id?: string }).id!;

  const attempts = await prisma.attempt.findMany({
    where: { userId },
    orderBy: { startedAt: "desc" },
    include: { exam: { select: { title: true, targetLevel: true } } },
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

import Link from "next/link";
import { Clock, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SECTION_LABEL } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ExamListPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      sections: { include: { _count: { select: { questions: true } } } },
    },
  });

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Đề thi thử TOPIK II</h1>
        <p className="mt-2 text-muted-foreground">
          Chọn một đề để làm bài thi thử có bấm giờ và tự động chấm điểm.
        </p>
      </div>

      {exams.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Chưa có đề thi nào. Chạy <code className="rounded bg-muted px-1.5 py-0.5">npm run db:seed</code> để nạp dữ liệu mẫu.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const totalQuestions = exam.sections.reduce(
              (sum, s) => sum + s._count.questions,
              0
            );
            const totalSec = exam.sections.reduce((sum, s) => sum + s.durationSec, 0);
            return (
              <Card key={exam.id} className="flex h-full flex-col">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    {exam.targetLevel && <Badge variant="secondary">Cấp {exam.targetLevel}</Badge>}
                    {exam.isSample && <Badge variant="outline">Đề mẫu</Badge>}
                  </div>
                  <CardTitle className="pt-2 text-lg">{exam.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">{exam.description}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <FileText className="size-4" /> {totalQuestions} câu
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-4" /> {Math.round(totalSec / 60)} phút
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exam.sections.map((s) => (
                        <Badge key={s.id} variant="accent">
                          {SECTION_LABEL[s.type]} · {s._count.questions}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/thi-thu/${exam.id}`}>Vào thi</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

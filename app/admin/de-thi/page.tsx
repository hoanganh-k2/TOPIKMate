import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createExam, deleteExam } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminExamsPage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { sections: true } } },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Quản lý đề thi</h1>
        <p className="text-muted-foreground">Tạo đề mới rồi thêm phần thi và câu hỏi.</p>
      </div>

      {/* Tạo đề mới */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="size-5" /> Tạo đề thi mới
          </CardTitle>
          <CardDescription>Sau khi tạo, bạn sẽ vào trang thêm phần & câu hỏi.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createExam} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Tên đề</Label>
              <Input id="title" name="title" required placeholder="Đề thi thử TOPIK II — Số 2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetLevel">Cấp độ mục tiêu (3–6, tuỳ chọn)</Label>
              <Input id="targetLevel" name="targetLevel" type="number" min={3} max={6} placeholder="4" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" name="description" placeholder="Mô tả ngắn về đề thi..." />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Tạo đề</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Danh sách đề */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Danh sách đề ({exams.length})</h2>
        {exams.length === 0 ? (
          <p className="text-sm text-muted-foreground">Chưa có đề nào.</p>
        ) : (
          exams.map((exam) => (
            <Card key={exam.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{exam.title}</span>
                    {exam.targetLevel && <Badge variant="secondary">Cấp {exam.targetLevel}</Badge>}
                    {exam.isSample && <Badge variant="outline">Đề mẫu</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{exam._count.sections} phần thi</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/de-thi/${exam.id}`}>
                      <Pencil className="size-4" /> Sửa
                    </Link>
                  </Button>
                  <form action={deleteExam}>
                    <input type="hidden" name="examId" value={exam.id} />
                    <Button type="submit" variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="size-4" /> Xoá
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

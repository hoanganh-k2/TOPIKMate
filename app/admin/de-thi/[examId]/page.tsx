import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SECTION_LABEL } from "@/lib/utils";
import { QuestionForm } from "@/components/admin/question-form";
import { QuestionListItem } from "@/components/admin/question-list-item";
import { updateExam, addSection, deleteSection } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ExamBuilderPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
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

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-2 -ml-2">
          <Link href="/admin/de-thi">
            <ArrowLeft className="size-4" /> Danh sách đề
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Chỉnh sửa đề thi</h1>
      </div>

      {/* Thông tin đề */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin đề</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateExam} className="grid gap-4 sm:grid-cols-2">
            <input type="hidden" name="examId" value={exam.id} />
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Tên đề</Label>
              <Input id="title" name="title" required defaultValue={exam.title} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetLevel">Cấp độ mục tiêu</Label>
              <Input
                id="targetLevel"
                name="targetLevel"
                type="number"
                min={3}
                max={6}
                defaultValue={exam.targetLevel ?? ""}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" name="description" defaultValue={exam.description ?? ""} />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Lưu thông tin</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Thêm phần */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="size-5" /> Thêm phần thi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addSection} className="flex flex-wrap items-end gap-3">
            <input type="hidden" name="examId" value={exam.id} />
            <div className="space-y-2">
              <Label htmlFor="type">Loại phần</Label>
              <select
                id="type"
                name="type"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
              >
                <option value="LISTENING">Nghe (듣기)</option>
                <option value="READING">Đọc (읽기)</option>
                <option value="WRITING">Viết (쓰기)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="durationMin">Thời lượng (phút)</Label>
              <Input
                id="durationMin"
                name="durationMin"
                type="number"
                min={1}
                defaultValue={10}
                className="w-28"
              />
            </div>
            <Button type="submit">Thêm phần</Button>
          </form>
        </CardContent>
      </Card>

      {/* Các phần & câu hỏi */}
      {exam.sections.length === 0 ? (
        <p className="text-sm text-muted-foreground">Chưa có phần thi nào. Hãy thêm phần ở trên.</p>
      ) : (
        exam.sections.map((section) => (
          <Card key={section.id}>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Badge variant="accent">{SECTION_LABEL[section.type] ?? section.type}</Badge>
                <span className="text-sm font-normal text-muted-foreground">
                  {Math.round(section.durationSec / 60)} phút · {section.questions.length} câu
                </span>
              </CardTitle>
              <form action={deleteSection}>
                <input type="hidden" name="examId" value={exam.id} />
                <input type="hidden" name="sectionId" value={section.id} />
                <Button type="submit" variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="size-4" /> Xoá phần
                </Button>
              </form>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Danh sách câu hỏi */}
              {section.questions.length > 0 && (
                <div className="space-y-2">
                  {section.questions.map((q, i) => (
                    <QuestionListItem
                      key={q.id}
                      examId={exam.id}
                      sectionId={section.id}
                      index={i}
                      question={{
                        id: q.id,
                        type: q.type,
                        prompt: q.prompt,
                        passage: q.passage,
                        points: q.points,
                        explanation: q.explanation,
                        topic: q.topic,
                        imageUrl: q.imageUrl,
                        audioUrl: q.audioUrl,
                        choices: q.choices.map((c) => ({
                          label: c.label,
                          content: c.content,
                          isCorrect: c.isCorrect,
                        })),
                      }}
                    />
                  ))}
                </div>
              )}

              <QuestionForm examId={exam.id} sectionId={section.id} />
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

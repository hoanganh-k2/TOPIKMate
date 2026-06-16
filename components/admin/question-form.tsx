"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addQuestion } from "@/app/admin/actions";

export function QuestionForm({ examId, sectionId }: { examId: string; sectionId: string }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("MULTIPLE_CHOICE");
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) {
    return (
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Plus className="size-4" /> Thêm câu hỏi
      </Button>
    );
  }

  return (
    <form
      ref={formRef}
      action={async (fd) => {
        await addQuestion(fd);
        formRef.current?.reset();
        setType("MULTIPLE_CHOICE");
        setOpen(false);
      }}
      className="space-y-4 rounded-lg border bg-muted/30 p-4"
    >
      <input type="hidden" name="examId" value={examId} />
      <input type="hidden" name="sectionId" value={sectionId} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Loại câu hỏi</Label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
            <option value="WRITING">Tự luận (Viết)</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor={`points-${sectionId}`}>Điểm</Label>
          <Input id={`points-${sectionId}`} name="points" type="number" min={1} defaultValue={2} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Đề bài (tiếng Hàn)</Label>
        <Textarea name="prompt" required placeholder="다음을 듣고..." className="font-kr" />
      </div>

      <div className="space-y-2">
        <Label>Đoạn đọc / hội thoại (tuỳ chọn)</Label>
        <Textarea name="passage" placeholder="Đoạn văn hoặc hội thoại..." className="font-kr" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Ảnh minh hoạ (tuỳ chọn)</Label>
          <Input name="image" type="file" accept="image/*" />
        </div>
        <div className="space-y-2">
          <Label>Audio nghe (tuỳ chọn)</Label>
          <Input name="audio" type="file" accept="audio/*" />
        </div>
      </div>

      {type === "MULTIPLE_CHOICE" && (
        <div className="space-y-2">
          <Label>Đáp án (chọn nút bên trái cho đáp án đúng)</Label>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name="correct"
                value={String(i)}
                defaultChecked={i === 1}
                className="size-4 accent-[hsl(var(--primary))]"
                title="Đáp án đúng"
              />
              <span className="w-5 text-sm font-medium text-muted-foreground">{i}.</span>
              <Input name={`choice${i}`} placeholder={`Nội dung đáp án ${i}`} />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Label>Giải thích (tiếng Việt, tuỳ chọn)</Label>
        <Textarea name="explanation" placeholder="Giải thích đáp án..." />
      </div>

      <div className="space-y-2">
        <Label>Chủ đề / nhãn dạng câu (tuỳ chọn)</Label>
        <Input name="topic" placeholder="vd. Đọc hiểu — ý chính" />
      </div>

      <div className="flex gap-2">
        <Button type="submit">Lưu câu hỏi</Button>
        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
          Huỷ
        </Button>
      </div>
    </form>
  );
}

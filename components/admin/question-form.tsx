"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addQuestion, updateQuestion } from "@/app/admin/actions";

export type QuestionFormData = {
  id: string;
  type: string;
  prompt: string;
  passage: string | null;
  points: number;
  explanation: string | null;
  topic: string | null;
  imageUrl: string | null;
  audioUrl: string | null;
  choices: { label: string; content: string; isCorrect: boolean }[];
};

export function QuestionForm({
  examId,
  sectionId,
  question,
  onDone,
}: {
  examId: string;
  sectionId: string;
  /** Có giá trị => chế độ SỬA; không có => chế độ THÊM. */
  question?: QuestionFormData;
  /** Gọi khi lưu xong hoặc huỷ (dùng cho chế độ sửa để đóng form). */
  onDone?: () => void;
}) {
  const isEdit = !!question;
  const [open, setOpen] = useState(isEdit);
  const [type, setType] = useState(question?.type ?? "MULTIPLE_CHOICE");
  const formRef = useRef<HTMLFormElement>(null);

  // Map đáp án hiện có theo nhãn 1..4 để điền sẵn.
  const choiceContent = (i: number) =>
    question?.choices.find((c) => c.label === String(i))?.content ?? "";
  const correctIndex =
    question?.choices.find((c) => c.isCorrect)?.label ?? "1";

  function close() {
    if (isEdit) {
      onDone?.();
    } else {
      setOpen(false);
    }
  }

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
        if (isEdit) {
          await updateQuestion(fd);
          onDone?.();
        } else {
          await addQuestion(fd);
          formRef.current?.reset();
          setType("MULTIPLE_CHOICE");
          setOpen(false);
        }
      }}
      className="space-y-4 rounded-lg border bg-muted/30 p-4"
    >
      <input type="hidden" name="examId" value={examId} />
      <input type="hidden" name="sectionId" value={sectionId} />
      {isEdit && <input type="hidden" name="questionId" value={question.id} />}

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
          <Label htmlFor={`points-${sectionId}-${question?.id ?? "new"}`}>Điểm</Label>
          <Input
            id={`points-${sectionId}-${question?.id ?? "new"}`}
            name="points"
            type="number"
            min={1}
            defaultValue={question?.points ?? 2}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Đề bài (tiếng Hàn)</Label>
        <Textarea
          name="prompt"
          required
          placeholder="다음을 듣고..."
          className="font-kr"
          defaultValue={question?.prompt ?? ""}
        />
      </div>

      <div className="space-y-2">
        <Label>Đoạn đọc / hội thoại (tuỳ chọn)</Label>
        <Textarea
          name="passage"
          placeholder="Đoạn văn hoặc hội thoại..."
          className="font-kr"
          defaultValue={question?.passage ?? ""}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Ảnh minh hoạ (tuỳ chọn)</Label>
          <Input name="image" type="file" accept="image/*" />
          {isEdit && question.imageUrl && (
            <p className="text-xs text-muted-foreground">
              Đang có ảnh. Tải file mới để thay thế.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Audio nghe (tuỳ chọn)</Label>
          <Input name="audio" type="file" accept="audio/*" />
          {isEdit && question.audioUrl && (
            <p className="text-xs text-muted-foreground">
              Đang có audio. Tải file mới để thay thế.
            </p>
          )}
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
                defaultChecked={String(i) === correctIndex}
                className="size-4 accent-[hsl(var(--primary))]"
                title="Đáp án đúng"
              />
              <span className="w-5 text-sm font-medium text-muted-foreground">{i}.</span>
              <Input
                name={`choice${i}`}
                placeholder={`Nội dung đáp án ${i}`}
                defaultValue={choiceContent(i)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Label>Giải thích (tiếng Việt, tuỳ chọn)</Label>
        <Textarea
          name="explanation"
          placeholder="Giải thích đáp án..."
          defaultValue={question?.explanation ?? ""}
        />
      </div>

      <div className="space-y-2">
        <Label>Chủ đề / nhãn dạng câu (tuỳ chọn)</Label>
        <Input
          name="topic"
          placeholder="vd. Đọc hiểu — ý chính"
          defaultValue={question?.topic ?? ""}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">{isEdit ? "Cập nhật câu hỏi" : "Lưu câu hỏi"}</Button>
        <Button type="button" variant="ghost" onClick={close}>
          Huỷ
        </Button>
      </div>
    </form>
  );
}

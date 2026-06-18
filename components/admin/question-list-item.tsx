"use client";

import { useState } from "react";
import { Trash2, Pencil, Image as ImageIcon, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteQuestion } from "@/app/admin/actions";
import { QuestionForm, type QuestionFormData } from "./question-form";

export function QuestionListItem({
  examId,
  sectionId,
  index,
  question,
}: {
  examId: string;
  sectionId: string;
  index: number;
  question: QuestionFormData;
}) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <QuestionForm
        examId={examId}
        sectionId={sectionId}
        question={question}
        onDone={() => setEditing(false)}
      />
    );
  }

  const correct = question.choices.find((c) => c.isCorrect)?.label ?? "—";

  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border p-3">
      <div className="min-w-0">
        <p className="font-kr text-sm">
          <span className="text-muted-foreground">Câu {index + 1}. </span>
          {question.prompt}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{question.points} điểm</span>
          {question.type === "WRITING" && <Badge variant="outline">Tự luận</Badge>}
          {question.imageUrl && (
            <span className="inline-flex items-center gap-1">
              <ImageIcon className="size-3" /> ảnh
            </span>
          )}
          {question.audioUrl && (
            <span className="inline-flex items-center gap-1">
              <Music className="size-3" /> audio
            </span>
          )}
          {question.choices.length > 0 && (
            <span>
              {question.choices.length} đáp án · đúng: {correct}
            </span>
          )}
        </div>
      </div>
      <div className="flex shrink-0 items-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setEditing(true)}
        >
          <Pencil className="size-4" /> Sửa
        </Button>
        <form action={deleteQuestion}>
          <input type="hidden" name="examId" value={examId} />
          <input type="hidden" name="questionId" value={question.id} />
          <Button type="submit" variant="ghost" size="sm" className="text-destructive">
            <Trash2 className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

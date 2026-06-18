"use client";

import { useActionState, useRef } from "react";
import { Upload, Download, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bulkImportExams, type ImportResult } from "@/app/admin/actions";

const JSON_EXAMPLE = `[
  {
    "title": "Đề số 5 · Đọc",
    "targetLevel": 4,
    "description": "Phần Đọc",
    "sections": [
      {
        "type": "READING",
        "durationSec": 4200,
        "questions": [
          {
            "prompt": "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
            "topic": "Đọc — Điền từ",
            "explanation": "Đáp án ①.",
            "choices": [
              { "label": "1", "content": "그래서", "isCorrect": true },
              { "label": "2", "content": "그러나" },
              { "label": "3", "content": "그리고" },
              { "label": "4", "content": "하지만" }
            ]
          }
        ]
      }
    ]
  }
]`;

export function ExamImportForm() {
  const [state, formAction, pending] = useActionState<ImportResult, FormData>(
    bulkImportExams,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tải lên file <strong>.xlsx</strong>, <strong>.csv</strong> hoặc{" "}
        <strong>.json</strong> để tạo nhiều đề/câu hỏi cùng lúc. Đề có{" "}
        <strong>title trùng</strong> sẽ được ghi đè. Ảnh/audio chỉ tham chiếu qua đường
        dẫn trong thư mục <code>/public</code> (không nhúng file).
      </p>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <a href="/admin/de-thi/import/template" download>
            <Download className="size-4" /> Tải template Excel
          </a>
        </Button>
      </div>

      <form ref={formRef} action={formAction} className="flex flex-wrap items-end gap-3">
        <div className="space-y-2">
          <Input
            name="file"
            type="file"
            accept=".xlsx,.csv,.json"
            required
            className="max-w-xs"
          />
        </div>
        <Button type="submit" disabled={pending}>
          <Upload className="size-4" /> {pending ? "Đang nhập..." : "Nhập đề"}
        </Button>
      </form>

      {state?.ok === true && (
        <div className="flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/10 p-3 text-sm">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{state.message}</span>
        </div>
      )}
      {state?.ok === false && (
        <div className="space-y-1 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm">
          <div className="flex items-center gap-2 font-medium text-destructive">
            <AlertCircle className="size-4" /> Không nhập được — vui lòng sửa các lỗi sau:
          </div>
          <ul className="ml-6 list-disc text-destructive">
            {state.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <details className="text-sm">
        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
          Xem cấu trúc JSON mẫu
        </summary>
        <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted/30 p-3 text-xs">
          {JSON_EXAMPLE}
        </pre>
      </details>
    </div>
  );
}

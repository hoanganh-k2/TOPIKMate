"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatTime, SECTION_LABEL } from "@/lib/utils";
import { RichText } from "@/components/rich-text";

interface Choice {
  id: string;
  label: string;
  content: string;
}
interface Question {
  id: string;
  order: number;
  type: string; // "MULTIPLE_CHOICE" | "WRITING"
  prompt: string;
  passage: string | null;
  audioUrl: string | null;
  imageUrl: string | null;
  choices: Choice[];
}
interface Section {
  id: string;
  type: string; // "LISTENING" | "READING" | "WRITING"
  durationSec: number;
  questions: Question[];
}
interface Exam {
  id: string;
  title: string;
  targetLevel: number | null;
  sections: Section[];
}

export function ExamRunner({ exam }: { exam: Exam }) {
  const router = useRouter();

  // Gộp toàn bộ câu hỏi (kèm nhãn phần) thành 1 danh sách phẳng để điều hướng.
  const flat = useMemo(
    () =>
      exam.sections.flatMap((s) =>
        s.questions.map((q) => ({ ...q, sectionType: s.type }))
      ),
    [exam]
  );
  const totalSeconds = useMemo(
    () => exam.sections.reduce((sum, s) => sum + s.durationSec, 0),
    [exam]
  );

  // Lưu tiến độ làm bài vào localStorage để không mất khi tải lại trang/mất mạng.
  const storageKey = `topikmate:exam:${exam.id}`;

  function loadSaved(): {
    answers?: Record<string, string>;
    texts?: Record<string, string>;
    deadline?: number;
  } | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    () => loadSaved()?.answers ?? {}
  ); // qId -> choiceId
  const [texts, setTexts] = useState<Record<string, string>>(
    () => loadSaved()?.texts ?? {}
  ); // qId -> textAnswer
  // Mốc kết thúc (ms): tính một lần khi bắt đầu; giữ nguyên qua các lần tải lại.
  const [deadline] = useState<number>(
    () => loadSaved()?.deadline ?? Date.now() + totalSeconds * 1000
  );
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.round((deadline - Date.now()) / 1000))
  );
  const [submitting, setSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const q = flat[current];

  // Đồng hồ: tính lại từ `deadline` mỗi giây (đúng cả khi vừa tải lại). Tự nộp khi hết giờ.
  useEffect(() => {
    const id = setInterval(() => {
      const r = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setRemaining(r);
      if (r <= 0) {
        clearInterval(id);
        void submit();
      }
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ghi lại tiến độ mỗi khi đáp án thay đổi.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers, texts, deadline }));
    } catch {
      // bỏ qua nếu localStorage không khả dụng
    }
  }, [answers, texts, deadline, storageKey]);

  async function submit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);

    const payload = {
      examId: exam.id,
      answers: flat.map((item) => ({
        questionId: item.id,
        choiceId: item.type === "MULTIPLE_CHOICE" ? answers[item.id] ?? null : null,
        textAnswer: item.type === "WRITING" ? texts[item.id] ?? null : null,
      })),
    };

    const res = await fetch("/api/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setSubmitting(false);
      submittedRef.current = false;
      alert("Nộp bài thất bại. Vui lòng thử lại.");
      return;
    }
    const data = await res.json();
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // bỏ qua
    }
    router.push(`/thi-thu/${exam.id}/ket-qua/${data.attemptId}`);
  }

  const answeredCount = flat.filter(
    (item) =>
      (item.type === "MULTIPLE_CHOICE" && answers[item.id]) ||
      (item.type === "WRITING" && texts[item.id]?.trim())
  ).length;

  const lowTime = remaining <= 60;

  return (
    <div className="container py-6">
      {/* Thanh trên: tiêu đề + đồng hồ */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">{exam.title}</h1>
          <p className="text-sm text-muted-foreground">
            Đã làm {answeredCount}/{flat.length} câu
          </p>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border px-4 py-2 font-mono text-lg font-semibold",
            lowTime ? "border-destructive text-destructive" : "text-primary"
          )}
        >
          <Clock className="size-5" />
          {formatTime(remaining)}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        {/* Câu hỏi hiện tại */}
        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-2">
              <Badge variant="accent">{SECTION_LABEL[q.sectionType]}</Badge>
              <span className="text-sm font-medium text-muted-foreground">
                Câu {current + 1} / {flat.length}
              </span>
            </div>

            {q.audioUrl && (
              <audio controls className="w-full">
                <source src={q.audioUrl} />
              </audio>
            )}

            {q.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={q.imageUrl} alt="Hình minh hoạ" className="max-h-72 rounded-lg border" />
            )}

            {q.passage && (
              <div className="whitespace-pre-line rounded-lg bg-muted/60 p-4 font-kr text-lg leading-loose">
                <RichText text={q.passage} />
              </div>
            )}

            <p className="font-kr text-xl font-medium leading-relaxed">
              <RichText text={q.prompt} />
            </p>

            {q.type === "MULTIPLE_CHOICE" ? (
              <div className="space-y-2.5">
                {q.choices.map((c) => {
                  const selected = answers[q.id] === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: c.id }))}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors",
                        selected
                          ? "border-primary bg-accent"
                          : "hover:border-primary/40 hover:bg-muted/50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {c.label}
                      </span>
                      <span className="pt-0.5 font-kr text-lg">{c.content}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <textarea
                value={texts[q.id] ?? ""}
                onChange={(e) => setTexts((t) => ({ ...t, [q.id]: e.target.value }))}
                rows={6}
                placeholder="Nhập câu trả lời của bạn..."
                className="w-full rounded-lg border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            )}

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
              >
                <ChevronLeft className="size-4" /> Câu trước
              </Button>
              {current < flat.length - 1 ? (
                <Button onClick={() => setCurrent((c) => Math.min(flat.length - 1, c + 1))}>
                  Câu sau <ChevronRight className="size-4" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={submitting}>
                  <Send className="size-4" /> {submitting ? "Đang nộp..." : "Nộp bài"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bảng điều hướng câu hỏi */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <p className="mb-3 text-sm font-medium">Danh sách câu</p>
            <div className="grid grid-cols-6 gap-2 lg:grid-cols-5">
              {flat.map((item, i) => {
                const done =
                  (item.type === "MULTIPLE_CHOICE" && answers[item.id]) ||
                  (item.type === "WRITING" && texts[item.id]?.trim());
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                      i === current && "ring-2 ring-ring",
                      done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <Button onClick={submit} disabled={submitting} className="mt-4 w-full">
              <Send className="size-4" /> Nộp bài
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

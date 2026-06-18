"use client";

import { useMemo, useState, useTransition } from "react";
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers,
  Check,
  Repeat,
  AlarmClock,
  Volume2,
  CheckCircle2,
  XCircle,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, speakKorean } from "@/lib/utils";
import { markVocab } from "@/app/tu-vung/actions";

interface VocabItem {
  id: string;
  level: number;
  korean: string;
  reading: string | null;
  meaningVi: string;
  example: string | null;
  topic: string | null;
}

interface VocabStudyProps {
  items: VocabItem[];
  reviewMap?: Record<string, { box: number; due: boolean }>;
  dueCount?: number;
  loggedIn?: boolean;
}

export function VocabStudy({
  items,
  reviewMap = {},
  dueCount = 0,
  loggedIn = false,
}: VocabStudyProps) {
  const levels = useMemo(
    () => Array.from(new Set(items.map((i) => i.level))).sort(),
    [items]
  );
  const [level, setLevel] = useState<number | "ALL">("ALL");
  const [mode, setMode] = useState<"card" | "list" | "quiz">("card");
  const [dueOnly, setDueOnly] = useState(false);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [pending, startTransition] = useTransition();
  const [marked, setMarked] = useState<Record<string, "known" | "review">>({});

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        if (level !== "ALL" && i.level !== level) return false;
        if (dueOnly) {
          const r = reviewMap[i.id];
          // chưa học lần nào hoặc đã đến hạn
          if (r && !r.due) return false;
        }
        return true;
      }),
    [items, level, dueOnly, reviewMap]
  );

  function mark(vocabId: string, result: "known" | "review") {
    setMarked((m) => ({ ...m, [vocabId]: result }));
    startTransition(async () => {
      await markVocab(vocabId, result);
    });
  }

  const v = filtered[index % Math.max(1, filtered.length)];

  function changeLevel(l: number | "ALL") {
    setLevel(l);
    setIndex(0);
    setFlipped(false);
  }

  function toggleDueOnly() {
    setDueOnly((d) => !d);
    setIndex(0);
    setFlipped(false);
  }

  function next() {
    setFlipped(false);
    setIndex((i) => (i + 1) % filtered.length);
  }
  function prev() {
    setFlipped(false);
    setIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          <Button size="sm" variant={level === "ALL" ? "default" : "outline"} onClick={() => changeLevel("ALL")}>
            Tất cả cấp
          </Button>
          {levels.map((l) => (
            <Button key={l} size="sm" variant={level === l ? "default" : "outline"} onClick={() => changeLevel(l)}>
              Cấp {l}
            </Button>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap gap-1.5">
          {loggedIn && (
            <Button size="sm" variant={dueOnly ? "default" : "outline"} onClick={toggleDueOnly}>
              <AlarmClock className="size-4" /> Cần ôn hôm nay
              <Badge variant="secondary" className="ml-1">{dueCount}</Badge>
            </Button>
          )}
          <Button size="sm" variant={mode === "card" ? "default" : "outline"} onClick={() => setMode("card")}>
            <Layers className="size-4" /> Flashcard
          </Button>
          <Button size="sm" variant={mode === "list" ? "default" : "outline"} onClick={() => setMode("list")}>
            <LayoutGrid className="size-4" /> Danh sách
          </Button>
          <Button size="sm" variant={mode === "quiz" ? "default" : "outline"} onClick={() => setMode("quiz")}>
            <GraduationCap className="size-4" /> Kiểm tra
          </Button>
        </div>
      </div>

      {!loggedIn && (
        <p className="text-sm text-muted-foreground">
          💡 <a href="/dang-nhap?callbackUrl=/tu-vung" className="font-medium text-primary underline-offset-4 hover:underline">Đăng nhập</a>{" "}
          để lưu tiến độ và được nhắc ôn lại từ đã học (spaced repetition).
        </p>
      )}

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Chưa có từ vựng cho cấp độ này.
          </CardContent>
        </Card>
      ) : mode === "card" ? (
        <div className="mx-auto max-w-xl space-y-4">
          <button
            onClick={() => setFlipped((f) => !f)}
            className="group relative h-64 w-full"
            style={{ perspective: "1000px" }}
          >
            <div
              className="relative h-full w-full transition-transform duration-500"
              style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "" }}
            >
              {/* Mặt trước */}
              <Card
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Badge variant="secondary">Cấp {v.level}</Badge>
                <div className="flex items-center gap-2">
                  <span className="font-kr text-5xl font-bold">{v.korean}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="Phát âm"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakKorean(v.korean);
                    }}
                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    <Volume2 className="size-5" />
                  </span>
                </div>
                {v.reading && <span className="text-muted-foreground">[{v.reading}]</span>}
                <span className="text-xs text-muted-foreground">Nhấn để xem nghĩa</span>
              </Card>
              {/* Mặt sau */}
              <Card
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-accent p-6 text-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <span className="text-2xl font-bold text-accent-foreground">{v.meaningVi}</span>
                {v.example && (
                  <p className="font-kr text-muted-foreground">{v.example}</p>
                )}
              </Card>
            </div>
          </button>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={prev}>
              <ChevronLeft className="size-4" /> Trước
            </Button>
            <span className="text-sm text-muted-foreground">
              {index + 1} / {filtered.length}
            </span>
            <Button onClick={next}>
              Tiếp <ChevronRight className="size-4" />
            </Button>
          </div>
          {loggedIn && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pending}
                onClick={() => mark(v.id, "review")}
                className={cn(marked[v.id] === "review" && "border-amber-500 text-amber-600")}
              >
                <Repeat className="size-4" /> Cần ôn
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={pending}
                onClick={() => mark(v.id, "known")}
                className={cn(marked[v.id] === "known" && "border-emerald-500 text-emerald-600")}
              >
                <Check className="size-4" /> Đã thuộc
              </Button>
            </div>
          )}

          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={() => setFlipped((f) => !f)}>
              <RotateCcw className="size-4" /> Lật thẻ
            </Button>
          </div>
        </div>
      ) : mode === "quiz" ? (
        <VocabQuiz items={filtered} loggedIn={loggedIn} onMark={mark} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.id}>
              <CardContent className="space-y-1 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-kr text-xl font-bold">{item.korean}</span>
                    <button
                      type="button"
                      aria-label="Phát âm"
                      onClick={() => speakKorean(item.korean)}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Volume2 className="size-4" />
                    </button>
                  </div>
                  <Badge variant="secondary">Cấp {item.level}</Badge>
                </div>
                {item.reading && (
                  <p className="text-xs text-muted-foreground">[{item.reading}]</p>
                )}
                <p className="font-medium">{item.meaningVi}</p>
                {item.example && (
                  <p className="font-kr text-sm text-muted-foreground">{item.example}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/** Trộn mảng (Fisher–Yates) — trả về bản sao mới. */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Chế độ kiểm tra: hiện từ tiếng Hàn, chọn nghĩa tiếng Việt đúng trong 4 lựa chọn.
 * Mồi nhiễu ưu tiên lấy từ cùng cấp độ. Nếu đã đăng nhập, mỗi câu cập nhật SRS qua onMark.
 */
function VocabQuiz({
  items,
  loggedIn,
  onMark,
}: {
  items: VocabItem[];
  loggedIn: boolean;
  onMark: (vocabId: string, result: "known" | "review") => void;
}) {
  // Danh sách câu hỏi + lựa chọn, tính một lần cho bộ items hiện tại.
  const questions = useMemo(() => {
    return shuffle(items).map((target) => {
      const sameLevel = items.filter(
        (i) => i.id !== target.id && i.level === target.level
      );
      const pool = sameLevel.length >= 3 ? sameLevel : items.filter((i) => i.id !== target.id);
      const distractors = shuffle(pool).slice(0, 3).map((i) => i.meaningVi);
      const options = shuffle([target.meaningVi, ...distractors]);
      return { target, options };
    });
  }, [items]);

  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [stats, setStats] = useState({ correct: 0, answered: 0 });

  if (items.length < 2) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          Cần ít nhất 2 từ để làm bài kiểm tra. Hãy chọn cấp độ khác hoặc thêm từ vựng.
        </CardContent>
      </Card>
    );
  }

  const q = questions[index % questions.length];
  const answered = chosen !== null;

  function pick(option: string) {
    if (answered) return;
    const isCorrect = option === q.target.meaningVi;
    setChosen(option);
    setStats((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), answered: s.answered + 1 }));
    if (loggedIn) onMark(q.target.id, isCorrect ? "known" : "review");
  }

  function nextQuestion() {
    setChosen(null);
    setIndex((i) => (i + 1) % questions.length);
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Câu {(index % questions.length) + 1} / {questions.length}
        </span>
        <span>
          Đúng {stats.correct}/{stats.answered}
        </span>
      </div>

      <Card>
        <CardContent className="space-y-5 p-6">
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">Cấp {q.target.level}</Badge>
            <button
              type="button"
              aria-label="Phát âm"
              onClick={() => speakKorean(q.target.korean)}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Volume2 className="size-4" />
            </button>
          </div>
          <p className="text-center font-kr text-4xl font-bold">{q.target.korean}</p>

          <div className="space-y-2.5">
            {q.options.map((opt) => {
              const isCorrect = opt === q.target.meaningVi;
              const isChosen = chosen === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={answered}
                  onClick={() => pick(opt)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg border p-3.5 text-left transition-colors disabled:cursor-default",
                    !answered && "hover:border-primary/40 hover:bg-muted/50",
                    answered && isCorrect && "border-primary bg-accent",
                    answered && isChosen && !isCorrect && "border-destructive bg-destructive/10"
                  )}
                >
                  <span className="flex-1">{opt}</span>
                  {answered && isCorrect && <CheckCircle2 className="size-5 text-primary" />}
                  {answered && isChosen && !isCorrect && (
                    <XCircle className="size-5 text-destructive" />
                  )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="flex justify-end">
              <Button onClick={nextQuestion}>
                Câu tiếp <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

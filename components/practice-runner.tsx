"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, SECTION_LABEL } from "@/lib/utils";
import { RichText } from "@/components/rich-text";

interface PItem {
  id: string;
  prompt: string;
  passage: string | null;
  audioUrl: string | null;
  imageUrl: string | null;
  explanation: string | null;
  topic: string | null;
  sectionType: "LISTENING" | "READING" | "WRITING";
  choices: { id: string; label: string; content: string; isCorrect: boolean }[];
}

type Filter = "ALL" | "LISTENING" | "READING";

export function PracticeRunner({ items }: { items: PItem[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [topic, setTopic] = useState<string>("ALL");
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);

  const topics = useMemo(
    () => Array.from(new Set(items.map((i) => i.topic).filter(Boolean))) as string[],
    [items]
  );

  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (filter === "ALL" || i.sectionType === filter) &&
          (topic === "ALL" || i.topic === topic)
      ),
    [items, filter, topic]
  );

  const q = filtered[index];

  function reset() {
    setIndex(0);
    setChosen(null);
  }

  function selectFilter(f: Filter) {
    setFilter(f);
    reset();
  }

  const correctId = q?.choices.find((c) => c.isCorrect)?.id;

  return (
    <div className="space-y-6">
      {/* Bộ lọc */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {(["ALL", "LISTENING", "READING"] as Filter[]).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => selectFilter(f)}
            >
              {f === "ALL" ? "Tất cả" : SECTION_LABEL[f]}
            </Button>
          ))}
        </div>
        {topics.length > 0 && (
          <select
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              reset();
            }}
            className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="ALL">Tất cả chủ đề</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        )}
        <span className="ml-auto text-sm text-muted-foreground">
          {filtered.length} câu
        </span>
      </div>

      {filtered.length === 0 || !q ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Không có câu hỏi phù hợp bộ lọc.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-2">
              <Badge variant="accent">{SECTION_LABEL[q.sectionType]}</Badge>
              {q.topic && <Badge variant="secondary">{q.topic}</Badge>}
              <span className="ml-auto text-sm text-muted-foreground">
                Câu {index + 1} / {filtered.length}
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

            <div className="space-y-2.5">
              {q.choices.map((c) => {
                const isChosen = chosen === c.id;
                const showResult = chosen !== null;
                return (
                  <button
                    key={c.id}
                    disabled={showResult}
                    onClick={() => setChosen(c.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors disabled:cursor-default",
                      !showResult && "hover:border-primary/40 hover:bg-muted/50",
                      showResult && c.isCorrect && "border-primary bg-accent",
                      showResult && isChosen && !c.isCorrect && "border-destructive bg-destructive/10"
                    )}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
                      {c.label}
                    </span>
                    <span className="flex-1 pt-0.5 font-kr text-lg">{c.content}</span>
                    {showResult && c.isCorrect && (
                      <CheckCircle2 className="size-5 text-primary" />
                    )}
                    {showResult && isChosen && !c.isCorrect && (
                      <XCircle className="size-5 text-destructive" />
                    )}
                  </button>
                );
              })}
            </div>

            {chosen !== null && (
              <div
                className={cn(
                  "rounded-lg p-3 text-sm",
                  chosen === correctId ? "bg-primary/5" : "bg-destructive/5"
                )}
              >
                <p className="font-medium">
                  {chosen === correctId ? "Chính xác! 🎉" : "Chưa đúng."}
                </p>
                {q.explanation && (
                  <p className="mt-1 text-muted-foreground">{q.explanation}</p>
                )}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setChosen(null)} disabled={chosen === null}>
                <RotateCcw className="size-4" /> Làm lại
              </Button>
              <Button
                onClick={() => {
                  setChosen(null);
                  setIndex((i) => (i + 1) % filtered.length);
                }}
              >
                Câu tiếp theo <ChevronRight className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

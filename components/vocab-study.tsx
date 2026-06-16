"use client";

import { useMemo, useState } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, LayoutGrid, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface VocabItem {
  id: string;
  level: number;
  korean: string;
  reading: string | null;
  meaningVi: string;
  example: string | null;
  topic: string | null;
}

export function VocabStudy({ items }: { items: VocabItem[] }) {
  const levels = useMemo(
    () => Array.from(new Set(items.map((i) => i.level))).sort(),
    [items]
  );
  const [level, setLevel] = useState<number | "ALL">("ALL");
  const [mode, setMode] = useState<"card" | "list">("card");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filtered = useMemo(
    () => items.filter((i) => level === "ALL" || i.level === level),
    [items, level]
  );

  const v = filtered[index % Math.max(1, filtered.length)];

  function changeLevel(l: number | "ALL") {
    setLevel(l);
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
        <div className="ml-auto flex gap-1.5">
          <Button size="sm" variant={mode === "card" ? "default" : "outline"} onClick={() => setMode("card")}>
            <Layers className="size-4" /> Flashcard
          </Button>
          <Button size="sm" variant={mode === "list" ? "default" : "outline"} onClick={() => setMode("list")}>
            <LayoutGrid className="size-4" /> Danh sách
          </Button>
        </div>
      </div>

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
                <span className="font-kr text-5xl font-bold">{v.korean}</span>
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
          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={() => setFlipped((f) => !f)}>
              <RotateCcw className="size-4" /> Lật thẻ
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.id}>
              <CardContent className="space-y-1 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-kr text-xl font-bold">{item.korean}</span>
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

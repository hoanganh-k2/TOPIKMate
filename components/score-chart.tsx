"use client";

import { useMemo } from "react";

export interface ScorePoint {
  label: string; // nhãn trục X (vd. ngày)
  percent: number; // 0..100
}

/**
 * Biểu đồ đường % điểm theo thời gian — vẽ bằng SVG thuần, không cần thư viện.
 */
export function ScoreChart({ data }: { data: ScorePoint[] }) {
  const W = 640;
  const H = 220;
  const padX = 36;
  const padY = 24;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;

  const points = useMemo(() => {
    if (data.length === 0) return [];
    const stepX = data.length > 1 ? innerW / (data.length - 1) : 0;
    return data.map((d, i) => {
      const x = padX + (data.length > 1 ? stepX * i : innerW / 2);
      const y = padY + innerH * (1 - Math.min(100, Math.max(0, d.percent)) / 100);
      return { x, y, ...d };
    });
  }, [data, innerW, innerH]);

  if (data.length === 0) return null;

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Biểu đồ điểm theo thời gian">
      {/* lưới ngang + nhãn % */}
      {[0, 25, 50, 75, 100].map((g) => {
        const y = padY + innerH * (1 - g / 100);
        return (
          <g key={g}>
            <line x1={padX} y1={y} x2={W - padX} y2={y} className="stroke-border" strokeWidth={1} />
            <text x={padX - 6} y={y + 3} textAnchor="end" className="fill-muted-foreground text-[10px]">
              {g}
            </text>
          </g>
        );
      })}

      {/* đường nối */}
      <path d={linePath} fill="none" className="stroke-primary" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />

      {/* điểm dữ liệu + nhãn trục X */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} className="fill-primary" />
          <text x={p.x} y={H - 6} textAnchor="middle" className="fill-muted-foreground text-[10px]">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

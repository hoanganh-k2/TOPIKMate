import Link from "next/link";
import { CalendarDays, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PHASES = [
  {
    month: "Tháng 1",
    title: "Nền tảng",
    items: [
      "Ôn lại ngữ pháp sơ–trung cấp (cấp 3)",
      "Học 20 từ vựng mỗi ngày bằng flashcard",
      "Làm quen cấu trúc đề: Nghe, Đọc, Viết",
    ],
  },
  {
    month: "Tháng 2",
    title: "Luyện theo dạng",
    items: [
      "Luyện từng dạng câu hỏi Nghe & Đọc",
      "Học ngữ pháp trung cấp (cấp 4)",
      "Bắt đầu luyện viết câu (51–52)",
    ],
  },
  {
    month: "Tháng 3",
    title: "Tăng tốc & thi thử",
    items: [
      "Làm đề thi thử bấm giờ mỗi tuần",
      "Phân tích lỗi sai, ôn lại điểm yếu",
      "Luyện viết đoạn văn (53–54)",
    ],
  },
];

const LEVELS = [
  { level: 3, score: "120–149", desc: "Hiểu và sử dụng tiếng Hàn trong sinh hoạt hằng ngày." },
  { level: 4, score: "150–189", desc: "Sử dụng tiếng Hàn ở nơi làm việc, hiểu chủ đề xã hội quen thuộc." },
  { level: 5, score: "190–229", desc: "Sử dụng tiếng Hàn trong nghiên cứu, công việc chuyên môn." },
  { level: 6, score: "230–300", desc: "Sử dụng tiếng Hàn thành thạo gần như người bản xứ." },
];

export default function RoadmapPage() {
  return (
    <div className="container py-12">
      <div className="mb-10 max-w-2xl">
        <Badge variant="accent" className="mb-3 gap-1">
          <CalendarDays className="size-3.5" /> Lộ trình 3 tháng
        </Badge>
        <h1 className="text-3xl font-bold">Lộ trình ôn thi TOPIK II</h1>
        <p className="mt-2 text-muted-foreground">
          Gợi ý lộ trình 3 tháng đi từ nền tảng đến luyện đề. Hãy điều chỉnh theo trình độ
          và mục tiêu điểm của bạn.
        </p>
      </div>

      {/* Các giai đoạn */}
      <div className="mb-14 grid gap-5 md:grid-cols-3">
        {PHASES.map((p, i) => (
          <Card key={p.month} className="relative">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{p.month}</p>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mục tiêu cấp độ */}
      <div className="mb-6 flex items-center gap-2">
        <Target className="size-5 text-primary" />
        <h2 className="text-2xl font-bold">Mục tiêu theo cấp độ</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LEVELS.map((l) => (
          <Card key={l.level}>
            <CardHeader>
              <Badge className="w-fit">Cấp {l.level}</Badge>
              <CardTitle className="pt-2 text-primary">{l.score} điểm</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{l.desc}</CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/thi-thu">Làm đề thi thử</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/luyen-tap">Luyện theo dạng</Link>
        </Button>
      </div>
    </div>
  );
}

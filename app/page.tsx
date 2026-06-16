import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Headphones,
  BookOpen,
  PenLine,
  Target,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  { icon: Clock, title: "Thi thử bấm giờ", desc: "Mô phỏng phòng thi thật, tự động chấm điểm trắc nghiệm ngay." },
  { icon: Target, title: "Luyện theo dạng", desc: "Lọc câu hỏi theo phần và chủ đề, phản hồi đúng/sai tức thì." },
  { icon: BookOpen, title: "Từ vựng & ngữ pháp", desc: "Flashcard từ vựng và mẫu ngữ pháp theo từng cấp độ." },
  { icon: Sparkles, title: "Theo dõi tiến độ", desc: "Lưu lịch sử bài thi và xem điểm số tiến bộ theo thời gian." },
];

const LEVELS = [
  { level: 3, score: "120–149 điểm", desc: "Giao tiếp cơ bản trong sinh hoạt hằng ngày." },
  { level: 4, score: "150–189 điểm", desc: "Sử dụng tiếng Hàn ở nơi làm việc, hiểu tin tức đơn giản." },
  { level: 5, score: "190–229 điểm", desc: "Thực hiện chức năng ngôn ngữ trong nghiên cứu, công việc." },
  { level: 6, score: "230–300 điểm", desc: "Sử dụng tiếng Hàn gần như người bản xứ." },
];

export default async function HomePage() {
  const exams = await prisma.exam.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { _count: { select: { sections: true } } },
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-hero">
        <div className="container grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <Badge variant="accent" className="gap-1">
              <GraduationCap className="size-3.5" /> Ôn luyện TOPIK II
            </Badge>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Chinh phục <span className="text-primary">TOPIK II</span> cùng TOPIKMate
            </h1>
            <p className="text-lg text-muted-foreground">
              Thi thử bám sát đề thật, luyện tập theo từng dạng câu hỏi, học từ vựng và
              ngữ pháp — tất cả trong một nền tảng tiếng Việt.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/thi-thu">
                  Bắt đầu thi thử <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/luyen-tap">Luyện theo dạng</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Headphones, label: "Nghe (듣기)" },
              { icon: BookOpen, label: "Đọc (읽기)" },
              { icon: PenLine, label: "Viết (쓰기)" },
              { icon: Target, label: "Cấp độ 3–6" },
            ].map((b) => (
              <Card key={b.label} className="bg-card/70">
                <CardContent className="flex flex-col items-start gap-3 p-5">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <b.icon className="size-6" />
                  </span>
                  <span className="font-semibold">{b.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Vì sao chọn TOPIKMate?</h2>
          <p className="mt-2 text-muted-foreground">Mọi công cụ bạn cần để đạt mục tiêu điểm số.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} className="h-full">
              <CardHeader>
                <span className="mb-2 flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <f.icon className="size-6" />
                </span>
                <CardTitle className="text-lg">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{f.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Levels */}
      <section className="bg-muted/40 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Các cấp độ TOPIK II</h2>
            <p className="mt-2 text-muted-foreground">Đặt mục tiêu rõ ràng và theo dõi tiến bộ.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LEVELS.map((l) => (
              <Card key={l.level}>
                <CardHeader>
                  <Badge className="w-fit">Cấp {l.level}</Badge>
                  <CardTitle className="pt-2 text-primary">{l.score}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{l.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured exams */}
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold">Đề thi nổi bật</h2>
            <p className="mt-2 text-muted-foreground">Bắt đầu với một đề thi thử ngay hôm nay.</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/thi-thu">
              Xem tất cả <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {exams.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Chưa có đề thi. Hãy chạy <code className="rounded bg-muted px-1.5 py-0.5">npm run db:seed</code> để nạp dữ liệu mẫu.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {exams.map((exam) => (
              <Card key={exam.id} className="flex h-full flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {exam.targetLevel && <Badge variant="secondary">Cấp {exam.targetLevel}</Badge>}
                    {exam.isSample && <Badge variant="outline">Đề mẫu</Badge>}
                  </div>
                  <CardTitle className="pt-2 text-lg">{exam.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-4">
                  <p className="text-sm text-muted-foreground">{exam.description}</p>
                  <Button asChild className="w-full">
                    <Link href={`/thi-thu/${exam.id}`}>Vào thi</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

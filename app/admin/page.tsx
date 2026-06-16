import Link from "next/link";
import { FileText, HelpCircle, BookOpen, Languages } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [exams, questions, vocab, grammar] = await Promise.all([
    prisma.exam.count(),
    prisma.question.count(),
    prisma.vocab.count(),
    prisma.grammar.count(),
  ]);

  const stats = [
    { label: "Đề thi", value: exams, icon: FileText, href: "/admin/de-thi" },
    { label: "Câu hỏi", value: questions, icon: HelpCircle, href: "/admin/de-thi" },
    { label: "Từ vựng", value: vocab, icon: BookOpen, href: "/admin/tu-vung" },
    { label: "Ngữ pháp", value: grammar, icon: Languages, href: "/admin/ngu-phap" },
  ];

  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold">Bảng quản trị</h1>
      <p className="mb-8 text-muted-foreground">
        Thêm và quản lý nội dung TOPIKMate mà không cần sửa code.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-colors hover:border-primary/40">
              <CardContent className="flex items-center gap-4 p-5">
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <s.icon className="size-6" />
                </span>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

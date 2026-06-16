import Link from "next/link";
import { LayoutDashboard, FileText, BookOpen, Languages, ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/lib/auth-helpers";

const NAV = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/admin/de-thi", label: "Đề thi", icon: FileText },
  { href: "/admin/tu-vung", label: "Từ vựng", icon: BookOpen },
  { href: "/admin/ngu-phap", label: "Ngữ pháp", icon: Languages },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="container grid gap-8 py-10 lg:grid-cols-[220px_1fr]">
      <aside className="h-fit lg:sticky lg:top-24">
        <div className="mb-4 px-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Quản trị
          </p>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            Về trang chính
          </Link>
        </nav>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

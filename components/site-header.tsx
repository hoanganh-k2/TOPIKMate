import Link from "next/link";
import Image from "next/image";
import { Shield } from "lucide-react";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { NAV } from "@/lib/nav";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <MobileNav />
          <Link href="/" className="flex items-center" aria-label="TOPIKMate — Trang chủ">
            <Image
              src="/logo.png"
              alt="TOPIKMate"
              width={856}
              height={178}
              priority
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {session?.user ? (
            <>
              {(session.user as { role?: string }).role === "ADMIN" && (
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin">
                    <Shield className="size-4" /> Quản trị
                  </Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="sm">
                <Link href="/tai-khoan">{session.user.name || "Tài khoản"}</Link>
              </Button>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  Đăng xuất
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dang-nhap">Đăng nhập</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/dang-ky">Đăng ký</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

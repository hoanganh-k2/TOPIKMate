export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {new Date().getFullYear()} TOPIKMate — Ôn luyện TOPIK II hiệu quả.
        </p>
        <p>Dự án học tập, lấy cảm hứng từ Migii TOPIK.</p>
      </div>
    </footer>
  );
}

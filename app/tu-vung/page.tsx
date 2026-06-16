import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { VocabStudy } from "@/components/vocab-study";

export const dynamic = "force-dynamic";

export default async function VocabPage() {
  const items = await prisma.vocab.findMany({ orderBy: [{ level: "asc" }, { korean: "asc" }] });

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Từ vựng TOPIK</h1>
        <p className="mt-2 text-muted-foreground">
          Học từ vựng bằng flashcard hoặc xem danh sách, lọc theo cấp độ.
        </p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Chưa có từ vựng. Chạy <code className="rounded bg-muted px-1.5 py-0.5">npm run db:seed</code> để nạp dữ liệu mẫu.
          </CardContent>
        </Card>
      ) : (
        <VocabStudy items={items} />
      )}
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function GrammarPage() {
  const items = await prisma.grammar.findMany({ orderBy: [{ level: "asc" }, { pattern: "asc" }] });

  // Nhóm theo cấp độ
  const byLevel = items.reduce<Record<number, typeof items>>((acc, g) => {
    (acc[g.level] ??= []).push(g);
    return acc;
  }, {});
  const levels = Object.keys(byLevel).map(Number).sort();

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ngữ pháp TOPIK</h1>
        <p className="mt-2 text-muted-foreground">
          Các mẫu ngữ pháp quan trọng kèm ý nghĩa và ví dụ, sắp xếp theo cấp độ.
        </p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Chưa có ngữ pháp. Chạy <code className="rounded bg-muted px-1.5 py-0.5">npm run db:seed</code> để nạp dữ liệu mẫu.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {levels.map((lv) => (
            <div key={lv}>
              <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
                <Badge>Cấp {lv}</Badge>
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {byLevel[lv].map((g) => (
                  <Card key={g.id}>
                    <CardHeader>
                      <CardTitle className="font-kr text-xl text-primary">{g.pattern}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="font-medium">{g.meaningVi}</p>
                      {g.example && (
                        <p className="font-kr text-sm text-muted-foreground">Ví dụ: {g.example}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

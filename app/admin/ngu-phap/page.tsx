import { Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { createGrammar, deleteGrammar } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminGrammarPage() {
  const items = await prisma.grammar.findMany({ orderBy: [{ level: "asc" }, { pattern: "asc" }] });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Quản lý ngữ pháp</h1>
        <p className="text-muted-foreground">Thêm mẫu ngữ pháp mới hiển thị ngay ở trang Ngữ pháp.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="size-5" /> Thêm ngữ pháp
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createGrammar} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pattern">Mẫu ngữ pháp (tiếng Hàn)</Label>
              <Input id="pattern" name="pattern" required placeholder="-는 바람에" className="font-kr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Cấp độ</Label>
              <Input id="level" name="level" type="number" min={1} max={6} defaultValue={3} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="meaningVi">Ý nghĩa / cách dùng (tiếng Việt)</Label>
              <Textarea id="meaningVi" name="meaningVi" required placeholder="do (lý do ngoài ý muốn)..." />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="example">Ví dụ (tuỳ chọn)</Label>
              <Input id="example" name="example" placeholder="늦잠을 자는 바람에 지각했어요." className="font-kr" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Thêm ngữ pháp</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Danh sách ({items.length})</h2>
        {items.map((g) => (
          <Card key={g.id}>
            <CardContent className="flex items-center justify-between gap-3 p-3">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Cấp {g.level}</Badge>
                <span className="font-kr text-lg font-semibold text-primary">{g.pattern}</span>
                <span className="truncate text-muted-foreground">{g.meaningVi}</span>
              </div>
              <form action={deleteGrammar}>
                <input type="hidden" name="grammarId" value={g.id} />
                <Button type="submit" variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="size-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

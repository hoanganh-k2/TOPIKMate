import { Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createVocab, deleteVocab } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminVocabPage() {
  const items = await prisma.vocab.findMany({ orderBy: [{ level: "asc" }, { korean: "asc" }] });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Quản lý từ vựng</h1>
        <p className="text-muted-foreground">Thêm từ vựng mới hiển thị ngay ở trang Từ vựng.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="size-5" /> Thêm từ vựng
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createVocab} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="korean">Từ (tiếng Hàn)</Label>
              <Input id="korean" name="korean" required placeholder="환경" className="font-kr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reading">Cách đọc</Label>
              <Input id="reading" name="reading" placeholder="hwan-gyeong" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meaningVi">Nghĩa (tiếng Việt)</Label>
              <Input id="meaningVi" name="meaningVi" required placeholder="môi trường" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Cấp độ</Label>
              <Input id="level" name="level" type="number" min={1} max={6} defaultValue={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="example">Ví dụ (tuỳ chọn)</Label>
              <Input id="example" name="example" placeholder="환경을 보호해야 해요." className="font-kr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Chủ đề (tuỳ chọn)</Label>
              <Input id="topic" name="topic" placeholder="Xã hội" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Thêm từ</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Danh sách ({items.length})</h2>
        {items.map((v) => (
          <Card key={v.id}>
            <CardContent className="flex items-center justify-between gap-3 p-3">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">Cấp {v.level}</Badge>
                <span className="font-kr text-lg font-semibold">{v.korean}</span>
                <span className="text-muted-foreground">{v.meaningVi}</span>
              </div>
              <form action={deleteVocab}>
                <input type="hidden" name="vocabId" value={v.id} />
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

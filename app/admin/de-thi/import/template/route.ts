import { requireAdmin } from "@/lib/auth-helpers";
import { buildTemplateXlsx } from "@/lib/exam-import";

export const dynamic = "force-dynamic";

/** Tải file template Excel (header + dòng ví dụ) để admin điền đề rồi import lại. */
export async function GET() {
  await requireAdmin();
  const buffer = buildTemplateXlsx();
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="mau-nhap-de-thi.xlsx"',
    },
  });
}

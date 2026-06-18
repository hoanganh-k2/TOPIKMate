/**
 * Import ĐỀ THẬT vào DB theo kiểu "cộng thêm" (additive, idempotent).
 *
 * Khác với `prisma/seed.ts` (xoá sạch toàn bộ DB rồi nạp dữ liệu mẫu),
 * script này CHỈ động tới các đề khai báo trong `data/exams/index.ts`:
 *   - Với mỗi đề: xoá đề cũ TRÙNG `title` (cascade xoá section/question/choice
 *     và các Attempt của riêng đề đó) rồi tạo lại.
 *   - KHÔNG đụng tới user, từ vựng, ngữ pháp hay các đề khác.
 *
 * Chạy: `npm run db:import`
 */
import { PrismaClient } from "@prisma/client";
import { exams } from "../data/exams";
import type { ExamSeed } from "../data/exams/types";
import { validateExam, importExamData } from "../lib/exam-import";

const prisma = new PrismaClient();

/** Tạo 1 đề (đã xoá bản cũ trùng title) và trả về số liệu để log. */
async function importExam(exam: ExamSeed) {
  // Timeout rộng hơn mặc định (5s) vì DB từ xa (Neon) có độ trễ mạng,
  // mỗi đề ghi nhiều section/question/choice trong một transaction.
  return prisma.$transaction((tx) => importExamData(tx, exam), {
    timeout: 60_000,
    maxWait: 15_000,
  });
}

async function main() {
  if (!exams.length) {
    console.log("⚠️  Chưa có đề nào trong data/exams/index.ts — không có gì để import.");
    return;
  }

  // Gom toàn bộ lỗi validate trước, không nạp nếu có lỗi.
  const allErrors = exams.flatMap(validateExam);
  if (allErrors.length) {
    console.error("❌ Dữ liệu đề không hợp lệ:\n - " + allErrors.join("\n - "));
    process.exit(1);
  }

  // Dọn các đề CŨ thuộc bộ "TOPIK 300+" mà KHÔNG còn trong danh sách hiện tại
  // (vd. bản gộp 3 phần cũ sau khi đã tách thành "· Nghe / · Đọc / · Viết").
  // Chỉ động tới đề có tiền tố này ⇒ không đụng đề mẫu/đề khác.
  const PREFIX = "TOPIK II 300+ —";
  const keepTitles = exams.map((e) => e.title);
  const stale = await prisma.exam.deleteMany({
    where: { title: { startsWith: PREFIX }, NOT: { title: { in: keepTitles } } },
  });
  if (stale.count) console.log(`🧹 Đã xoá ${stale.count} đề cũ không còn dùng (vd. bản gộp).`);

  console.log(`▶️  Import ${exams.length} đề...`);
  for (const exam of exams) {
    const { sectionCount, questionCount } = await importExam(exam);
    console.log(`   ✅ "${exam.title}" — ${sectionCount} phần, ${questionCount} câu.`);
  }
  console.log("🎉 Import xong. Mở /thi-thu để kiểm tra.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

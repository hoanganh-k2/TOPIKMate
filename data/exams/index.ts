import { type ExamSeed, splitByPart } from "./types";
import { de01 } from "./de-01";
import { de02 } from "./de-02";
// Khi điền xong nội dung thật cho từng đề, BỎ COMMENT dòng tương ứng:
// import { de03 } from "./de-03";
// import { de04 } from "./de-04";
// import { de05 } from "./de-05";

/**
 * Danh sách các đề sẽ được nạp khi chạy `npm run db:import`.
 *
 * Mỗi đề gốc (Nghe + Đọc + Viết) được TÁCH thành các đề con riêng biệt qua
 * `splitByPart` — mỗi phần thành 1 đề độc lập để luyện tách kỹ năng:
 *   "… · Nghe", "… · Đọc", "… · Viết".
 * Phần nào CHƯA có câu hỏi (template trống) sẽ tự động bị bỏ qua.
 */
export const exams: ExamSeed[] = [
  ...splitByPart(de01),
  ...splitByPart(de02),
  // ...splitByPart(de03), ...splitByPart(de04), ...splitByPart(de05),
];

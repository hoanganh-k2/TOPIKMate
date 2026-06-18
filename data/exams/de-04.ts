import type { ExamSeed } from "./types";

/**
 * ĐỀ SỐ 4 — TOPIK 300+  (TEMPLATE TRỐNG — chờ điền nội dung thật)
 * Xem hướng dẫn điền trong de-01.ts / de-02.ts.
 * Audio: public/audio/de-04/...  |  Ảnh: public/images/de-04/...
 * Điền xong → bỏ comment `de04` trong index.ts rồi `npm run db:import`.
 */
export const de04: ExamSeed = {
  title: "TOPIK II 300+ — Đề số 4",
  targetLevel: 5,
  description: "Đề số 4 — Sách TOPIK 300+.",
  isSample: false,
  sections: [
    { type: "LISTENING", durationSec: 3600, questions: [] },
    { type: "READING", durationSec: 4200, questions: [] },
    { type: "WRITING", durationSec: 3000, questions: [] },
  ],
};

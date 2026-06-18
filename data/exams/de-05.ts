import type { ExamSeed } from "./types";

/**
 * ĐỀ SỐ 5 — TOPIK 300+  (TEMPLATE TRỐNG — chờ điền nội dung thật)
 * Xem hướng dẫn điền trong de-01.ts / de-02.ts.
 * Audio: public/audio/de-05/...  |  Ảnh: public/images/de-05/...
 * Điền xong → bỏ comment `de05` trong index.ts rồi `npm run db:import`.
 */
export const de05: ExamSeed = {
  title: "TOPIK II 300+ — Đề số 5",
  targetLevel: 5,
  description: "Đề số 5 — Sách TOPIK 300+.",
  isSample: false,
  sections: [
    { type: "LISTENING", durationSec: 3600, questions: [] },
    { type: "READING", durationSec: 4200, questions: [] },
    { type: "WRITING", durationSec: 3000, questions: [] },
  ],
};

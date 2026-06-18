import type { ExamSeed } from "./types";

/**
 * ĐỀ SỐ 3 — TOPIK 300+  (TEMPLATE TRỐNG — chờ điền nội dung thật)
 * Xem hướng dẫn điền trong de-01.ts / de-02.ts.
 * Audio: public/audio/de-03/...  |  Ảnh: public/images/de-03/...
 * Điền xong → bỏ comment `de03` trong index.ts rồi `npm run db:import`.
 */
export const de03: ExamSeed = {
  title: "TOPIK II 300+ — Đề số 3",
  targetLevel: 4,
  description: "Đề số 3 — Sách TOPIK 300+.",
  isSample: false,
  sections: [
    { type: "LISTENING", durationSec: 3600, questions: [] },
    { type: "READING", durationSec: 4200, questions: [] },
    { type: "WRITING", durationSec: 3000, questions: [] },
  ],
};

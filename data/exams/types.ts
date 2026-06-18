/**
 * Khuôn dữ liệu cho một đề thi TOPIK II khi import vào DB.
 *
 * Shape khớp đúng với nested-create của Prisma (Exam → Section → Question → Choice)
 * trong `prisma/import-exams.ts`. Mỗi đề là 1 file `data/exams/de-NN.ts`,
 * được gom lại trong `data/exams/index.ts` rồi nạp bằng `npm run db:import`.
 */

export type SectionType = "LISTENING" | "READING" | "WRITING";
export type QuestionType = "MULTIPLE_CHOICE" | "WRITING";

export interface ChoiceSeed {
  /** Nhãn đáp án: "1" | "2" | "3" | "4". */
  label: string;
  /** Nội dung đáp án (tiếng Hàn hoặc tiếng Việt). */
  content: string;
  /** true nếu là đáp án đúng. Mỗi câu trắc nghiệm phải có đúng 1 đáp án đúng. */
  isCorrect?: boolean;
}

export interface QuestionSeed {
  /** Số thứ tự câu trong phần (1, 2, 3...). Nếu bỏ trống sẽ tự đánh theo vị trí mảng. */
  order?: number;
  /** Mặc định "MULTIPLE_CHOICE"; phần Viết dùng "WRITING". */
  type?: QuestionType;
  /** Đề bài (thường tiếng Hàn). Bắt buộc. */
  prompt: string;
  /** Đoạn đọc / kịch bản hội thoại (tuỳ chọn). */
  passage?: string;
  /** Đường dẫn file nghe, đặt trong /public. VD: "/audio/de-01/q01.mp3". */
  audioUrl?: string;
  /** Đường dẫn ảnh minh hoạ, đặt trong /public. VD: "/images/de-01/q12.png". */
  imageUrl?: string;
  /** Điểm cho câu. Mặc định 2 (trắc nghiệm). Câu Viết thường nhiều điểm hơn. */
  points?: number;
  /** Giải thích đáp án (tiếng Việt) — hiện ở trang xem lại kết quả. */
  explanation?: string;
  /** Nhãn dạng câu hỏi để lọc khi luyện tập. VD: "Nghe — Hội thoại ngắn". */
  topic?: string;
  /** Đáp án trắc nghiệm. Bỏ trống với câu Viết. */
  choices?: ChoiceSeed[];
}

export interface SectionSeed {
  type: SectionType;
  /** Thời lượng phần (giây). VD đề thật: Nghe 3600, Đọc 4200, Viết 3000. */
  durationSec: number;
  /** Thứ tự phần. Nếu bỏ trống sẽ tự đánh theo vị trí mảng. */
  order?: number;
  questions: QuestionSeed[];
}

export interface ExamSeed {
  /**
   * Tiêu đề đề — đồng thời là KHOÁ để import idempotent.
   * Import sẽ xoá đề cũ trùng `title` rồi tạo lại, nên giữ title ổn định & duy nhất.
   */
  title: string;
  /** Cấp độ mục tiêu 3–6 (tuỳ chọn). */
  targetLevel?: number;
  description?: string;
  /** false = đề thật (mặc định). true = dữ liệu mẫu/demo. */
  isSample?: boolean;
  sections: SectionSeed[];
}

/** Nhãn tiếng Việt cho từng phần — dùng khi tách đề thành các đề con. */
export const PART_LABEL: Record<SectionType, string> = {
  LISTENING: "Nghe",
  READING: "Đọc",
  WRITING: "Viết",
};

/**
 * Tách 1 đề (gồm nhiều phần Nghe/Đọc/Viết) thành NHIỀU đề con — mỗi phần 1 đề
 * riêng để người học luyện từng kỹ năng tách biệt (đúng như thi thật: Nghe·Viết
 * và Đọc thi ở hai buổi khác nhau).
 *
 * - Bỏ qua phần CHƯA có câu hỏi (mảng rỗng) ⇒ template trống không tạo đề thừa.
 * - `title` đề con = "<title gốc> · <Nghe|Đọc|Viết>" (vẫn là KHOÁ dedup khi import).
 */
export function splitByPart(exam: ExamSeed): ExamSeed[] {
  return exam.sections
    .filter((s) => s.questions?.length)
    .map((s) => ({
      title: `${exam.title} · ${PART_LABEL[s.type]}`,
      targetLevel: exam.targetLevel,
      description: exam.description
        ? `${PART_LABEL[s.type]} — ${exam.description}`
        : `Phần ${PART_LABEL[s.type]}`,
      isSample: exam.isSample,
      sections: [{ ...s, order: 1 }],
    }));
}

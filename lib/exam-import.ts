/**
 * Logic dùng chung cho việc nạp đề thi vào DB — gọi từ cả CLI
 * (`prisma/import-exams.ts`) lẫn server action nhập file của admin
 * (`bulkImportExams` trong `app/admin/actions.ts`).
 *
 * Gồm 3 phần:
 *   1. `validateExam`     — kiểm tra 1 đề hợp lệ (fail sớm, thông báo rõ ràng).
 *   2. `importExamData`   — xoá đề cũ trùng title rồi nested-create lại (idempotent).
 *   3. `parseExamsFile`   — đọc file JSON/Excel/CSV → mảng `ExamSeed`.
 */
import type { Prisma, PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";
import type { ExamSeed, QuestionType, SectionType } from "../data/exams/types";

/** Client dùng được trong transaction (đủ cho exam.deleteMany + exam.create). */
type TxClient = Prisma.TransactionClient | PrismaClient;

/* ----------------------------- VALIDATE ----------------------------- */

/** Kiểm tra tính hợp lệ của 1 đề trước khi nạp — trả về danh sách lỗi (rỗng = OK). */
export function validateExam(exam: ExamSeed): string[] {
  const errors: string[] = [];
  if (!exam.title?.trim()) errors.push("Đề thiếu `title`.");
  if (!exam.sections?.length) errors.push(`Đề "${exam.title}" không có section nào.`);

  exam.sections?.forEach((s, si) => {
    if (!s.questions?.length) {
      errors.push(`Đề "${exam.title}" — phần ${si + 1} (${s.type}) chưa có câu hỏi.`);
    }
    s.questions?.forEach((q, qi) => {
      const where = `Đề "${exam.title}" — phần ${si + 1} (${s.type}) — câu ${qi + 1}`;
      if (!q.prompt?.trim()) errors.push(`${where}: thiếu \`prompt\`.`);
      const type = q.type ?? "MULTIPLE_CHOICE";
      if (type === "MULTIPLE_CHOICE") {
        const choices = q.choices ?? [];
        if (choices.length < 2) errors.push(`${where}: cần ít nhất 2 đáp án.`);
        const correct = choices.filter((c) => c.isCorrect).length;
        if (correct !== 1) {
          errors.push(`${where}: phải có ĐÚNG 1 đáp án đúng (đang có ${correct}).`);
        }
      }
    });
  });
  return errors;
}

/* ------------------------------ IMPORT ------------------------------ */

/**
 * Tạo 1 đề (đã xoá bản cũ TRÙNG title — cascade lo section/question/choice/attempt)
 * và trả về số liệu để log. Phải gọi bên trong một transaction.
 */
export async function importExamData(tx: TxClient, exam: ExamSeed) {
  await tx.exam.deleteMany({ where: { title: exam.title } });

  let sectionCount = 0;
  let questionCount = 0;

  const created = await tx.exam.create({
    data: {
      title: exam.title,
      targetLevel: exam.targetLevel ?? null,
      description: exam.description ?? null,
      isSample: exam.isSample ?? false,
      sections: {
        create: exam.sections.map((s, si) => {
          sectionCount += 1;
          return {
            type: s.type,
            order: s.order ?? si + 1,
            durationSec: s.durationSec,
            questions: {
              create: s.questions.map((q, qi) => {
                questionCount += 1;
                const type = q.type ?? "MULTIPLE_CHOICE";
                return {
                  order: q.order ?? qi + 1,
                  type,
                  prompt: q.prompt,
                  passage: q.passage ?? null,
                  audioUrl: q.audioUrl ?? null,
                  imageUrl: q.imageUrl ?? null,
                  points: q.points ?? (type === "WRITING" ? 10 : 2),
                  explanation: q.explanation ?? null,
                  topic: q.topic ?? null,
                  choices:
                    type === "MULTIPLE_CHOICE" && q.choices?.length
                      ? {
                          create: q.choices.map((c, ci) => ({
                            label: c.label ?? String(ci + 1),
                            content: c.content,
                            isCorrect: c.isCorrect ?? false,
                          })),
                        }
                      : undefined,
                };
              }),
            },
          };
        }),
      },
    },
  });

  return { id: created.id, sectionCount, questionCount };
}

/* ------------------------------ PARSE ------------------------------ */

const SECTION_TYPES: SectionType[] = ["LISTENING", "READING", "WRITING"];
const QUESTION_TYPES: QuestionType[] = ["MULTIPLE_CHOICE", "WRITING"];
/** Thời lượng mặc định (giây) theo loại phần khi file không khai báo durationMin. */
const DEFAULT_DURATION_SEC: Record<SectionType, number> = {
  LISTENING: 3600,
  READING: 4200,
  WRITING: 3000,
};

/** Cột của template Excel/CSV — đồng thời là thứ tự cột khi sinh template. */
export const EXCEL_COLUMNS = [
  "title",
  "targetLevel",
  "description",
  "sectionType",
  "durationMin",
  "questionType",
  "order",
  "prompt",
  "passage",
  "audioUrl",
  "imageUrl",
  "points",
  "topic",
  "explanation",
  "choice1",
  "choice2",
  "choice3",
  "choice4",
  "correct",
] as const;

class ParseError extends Error {}
export function isParseError(e: unknown): e is ParseError {
  return e instanceof ParseError;
}

function s(v: unknown): string {
  return v === null || v === undefined ? "" : String(v).trim();
}
function optNum(v: unknown): number | undefined {
  const str = s(v);
  if (!str) return undefined;
  const n = Number(str);
  return Number.isFinite(n) ? n : undefined;
}

/** Phân loại file theo tên để chọn parser. */
export function isJsonFile(filename: string): boolean {
  return filename.toLowerCase().endsWith(".json");
}

/* ---- JSON ---- */

/** Nhận 1 object đề hoặc mảng đề; chuẩn hoá về `ExamSeed[]`. */
export function parseExamsJson(text: string): ExamSeed[] {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new ParseError(`JSON không hợp lệ: ${(e as Error).message}`);
  }
  const arr = Array.isArray(data) ? data : [data];
  if (!arr.length) throw new ParseError("File JSON rỗng — không có đề nào.");
  // Tin tưởng shape khớp ExamSeed; validateExam sẽ bắt lỗi chi tiết sau.
  return arr as ExamSeed[];
}

/* ---- Excel / CSV ---- */

type Row = Record<string, unknown>;

/** Gom các dòng (mỗi dòng = 1 câu hỏi) thành mảng `ExamSeed`. */
function rowsToExams(rows: Row[]): ExamSeed[] {
  // Giữ thứ tự xuất hiện của đề và của phần trong đề.
  const exams = new Map<string, ExamSeed>();
  // key đề -> (key phần -> SectionSeed) để tra nhanh.
  const sectionsByExam = new Map<string, Map<string, ExamSeed["sections"][number]>>();

  rows.forEach((row, idx) => {
    const line = idx + 2; // +1 cho header, +1 cho 1-based
    const title = s(row.title);
    const prompt = s(row.prompt);
    // Bỏ qua dòng trống hoàn toàn.
    if (!title && !prompt && !s(row.sectionType)) return;
    if (!title) throw new ParseError(`Dòng ${line}: thiếu cột \`title\`.`);

    const sectionTypeRaw = s(row.sectionType).toUpperCase();
    const sectionType = SECTION_TYPES.find((t) => t === sectionTypeRaw);
    if (!sectionType) {
      throw new ParseError(
        `Dòng ${line}: \`sectionType\` phải là LISTENING | READING | WRITING (đang là "${s(row.sectionType)}").`,
      );
    }

    // Lấy/khởi tạo đề.
    let exam = exams.get(title);
    if (!exam) {
      exam = {
        title,
        targetLevel: optNum(row.targetLevel),
        description: s(row.description) || undefined,
        sections: [],
      };
      exams.set(title, exam);
      sectionsByExam.set(title, new Map());
    }

    // Lấy/khởi tạo phần (1 phần / loại trong mỗi đề).
    const sectionMap = sectionsByExam.get(title)!;
    let section = sectionMap.get(sectionType);
    if (!section) {
      const durationMin = optNum(row.durationMin);
      section = {
        type: sectionType,
        durationSec: durationMin ? durationMin * 60 : DEFAULT_DURATION_SEC[sectionType],
        questions: [],
      };
      sectionMap.set(sectionType, section);
      exam.sections.push(section);
    }

    // Câu hỏi.
    const qTypeRaw = s(row.questionType).toUpperCase();
    const questionType =
      QUESTION_TYPES.find((t) => t === qTypeRaw) ??
      (sectionType === "WRITING" ? "WRITING" : "MULTIPLE_CHOICE");

    if (!prompt) throw new ParseError(`Dòng ${line}: thiếu cột \`prompt\`.`);

    const choices: NonNullable<ExamSeed["sections"][number]["questions"][number]["choices"]> = [];
    if (questionType === "MULTIPLE_CHOICE") {
      const correct = optNum(row.correct);
      for (let i = 1; i <= 4; i++) {
        const content = s(row[`choice${i}`]);
        if (content) choices.push({ label: String(i), content, isCorrect: correct === i });
      }
    }

    section.questions.push({
      order: optNum(row.order),
      type: questionType,
      prompt,
      passage: s(row.passage) || undefined,
      audioUrl: s(row.audioUrl) || undefined,
      imageUrl: s(row.imageUrl) || undefined,
      points: optNum(row.points),
      topic: s(row.topic) || undefined,
      explanation: s(row.explanation) || undefined,
      choices: choices.length ? choices : undefined,
    });
  });

  if (!exams.size) throw new ParseError("File không có dòng dữ liệu nào.");
  return [...exams.values()];
}

/** Đọc workbook Excel/CSV (sheet đầu tiên) → `ExamSeed[]`. */
export function parseExamsWorkbook(buffer: ArrayBuffer | Buffer): ExamSeed[] {
  const wb = XLSX.read(buffer, { type: "buffer" });
  const sheetName = wb.SheetNames[0];
  if (!sheetName) throw new ParseError("File Excel không có sheet nào.");
  const rows = XLSX.utils.sheet_to_json<Row>(wb.Sheets[sheetName], { defval: "" });
  return rowsToExams(rows);
}

/** Bộ điều phối: chọn parser theo tên file rồi trả `ExamSeed[]`. */
export async function parseExamsFile(file: {
  name: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
}): Promise<ExamSeed[]> {
  if (isJsonFile(file.name)) {
    const text = Buffer.from(await file.arrayBuffer()).toString("utf-8");
    return parseExamsJson(text);
  }
  return parseExamsWorkbook(await file.arrayBuffer());
}

/* --------------------------- TEMPLATE --------------------------- */

/** Vài dòng ví dụ cho file template Excel. */
export const TEMPLATE_ROWS: Row[] = [
  {
    title: "Đề mẫu nhập file · Nghe",
    targetLevel: 4,
    description: "Đề ví dụ tạo từ template",
    sectionType: "LISTENING",
    durationMin: 60,
    questionType: "MULTIPLE_CHOICE",
    order: 1,
    prompt: "다음을 듣고 가장 알맞은 그림을 고르십시오.",
    passage: "",
    audioUrl: "/audio/de-mau/q01.mp3",
    imageUrl: "/images/de-mau/q01.png",
    points: 2,
    topic: "Nghe — Chọn tranh",
    explanation: "Đáp án ③.",
    choice1: "그림 1",
    choice2: "그림 2",
    choice3: "그림 3",
    choice4: "그림 4",
    correct: 3,
  },
  {
    title: "Đề mẫu nhập file · Đọc",
    targetLevel: 4,
    description: "Đề ví dụ tạo từ template",
    sectionType: "READING",
    durationMin: 70,
    questionType: "MULTIPLE_CHOICE",
    order: 1,
    prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
    passage: "",
    audioUrl: "",
    imageUrl: "",
    points: 2,
    topic: "Đọc — Điền từ",
    explanation: "Đáp án ①.",
    choice1: "그래서",
    choice2: "그러나",
    choice3: "그리고",
    choice4: "하지만",
    correct: 1,
  },
  {
    title: "Đề mẫu nhập file · Viết",
    targetLevel: 4,
    description: "Đề ví dụ tạo từ template",
    sectionType: "WRITING",
    durationMin: 50,
    questionType: "WRITING",
    order: 51,
    prompt: "다음을 읽고 ( )에 들어갈 말을 쓰십시오.",
    passage: "여행을 가려면 먼저 ( ㉠ ).",
    audioUrl: "",
    imageUrl: "",
    points: 10,
    topic: "Viết — Điền câu",
    explanation: "",
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    correct: "",
  },
];

/** Sinh file template .xlsx (header + dòng ví dụ) dưới dạng Buffer để tải về. */
export function buildTemplateXlsx(): Buffer {
  const ws = XLSX.utils.json_to_sheet(TEMPLATE_ROWS, { header: [...EXCEL_COLUMNS] });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Đề thi");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

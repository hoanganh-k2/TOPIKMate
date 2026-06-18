"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import { saveUpload } from "@/lib/upload";
import {
  parseExamsFile,
  validateExam,
  importExamData,
  isParseError,
} from "@/lib/exam-import";

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}
function num(v: FormDataEntryValue | null, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/* ---------------- ĐỀ THI ---------------- */

export async function createExam(formData: FormData) {
  await requireAdmin();
  const title = str(formData.get("title"));
  if (!title) throw new Error("Tên đề không được để trống.");
  const targetLevelRaw = str(formData.get("targetLevel"));
  const exam = await prisma.exam.create({
    data: {
      title,
      targetLevel: targetLevelRaw ? num(formData.get("targetLevel"), 0) || null : null,
      description: str(formData.get("description")) || null,
    },
  });
  revalidatePath("/admin/de-thi");
  redirect(`/admin/de-thi/${exam.id}`);
}

export async function updateExam(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  const targetLevelRaw = str(formData.get("targetLevel"));
  await prisma.exam.update({
    where: { id: examId },
    data: {
      title: str(formData.get("title")),
      targetLevel: targetLevelRaw ? num(formData.get("targetLevel"), 0) || null : null,
      description: str(formData.get("description")) || null,
    },
  });
  revalidatePath(`/admin/de-thi/${examId}`);
  revalidatePath("/admin/de-thi");
}

export async function deleteExam(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  await prisma.exam.delete({ where: { id: examId } });
  revalidatePath("/admin/de-thi");
}

/* -------------- NHẬP ĐỀ HÀNG LOẠT TỪ FILE (Excel / JSON) -------------- */

export type ImportResult =
  | { ok: true; message: string }
  | { ok: false; errors: string[] }
  | null;

/**
 * Server action cho `useActionState`: nhận file (.xlsx/.csv/.json) → parse thành
 * `ExamSeed[]`, validate toàn bộ, rồi ghi đè theo title (idempotent giống db:import).
 * Không ghi gì vào DB nếu còn bất kỳ lỗi nào.
 */
export async function bulkImportExams(
  _prev: ImportResult,
  formData: FormData,
): Promise<ImportResult> {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, errors: ["Chưa chọn file."] };
  }

  // 1) Parse file → ExamSeed[]
  let exams;
  try {
    exams = await parseExamsFile(file);
  } catch (e) {
    const msg = isParseError(e) ? e.message : `Không đọc được file: ${(e as Error).message}`;
    return { ok: false, errors: [msg] };
  }

  // 2) Validate tất cả, fail sớm nếu có lỗi.
  const errors = exams.flatMap(validateExam);
  // Chặn trùng title ngay trong cùng 1 file (sẽ ghi đè lẫn nhau).
  const seen = new Set<string>();
  for (const ex of exams) {
    if (seen.has(ex.title)) errors.push(`Trùng title trong file: "${ex.title}".`);
    seen.add(ex.title);
  }
  if (errors.length) return { ok: false, errors };

  // 3) Ghi đè theo title trong 1 transaction.
  let sectionTotal = 0;
  let questionTotal = 0;
  await prisma.$transaction(async (tx) => {
    for (const exam of exams) {
      const { sectionCount, questionCount } = await importExamData(tx, exam);
      sectionTotal += sectionCount;
      questionTotal += questionCount;
    }
  });

  revalidatePath("/admin/de-thi");
  revalidatePath("/thi-thu");
  return {
    ok: true,
    message: `Đã nhập ${exams.length} đề · ${sectionTotal} phần · ${questionTotal} câu hỏi.`,
  };
}

/* ---------------- PHẦN THI ---------------- */

export async function addSection(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  const count = await prisma.section.count({ where: { examId } });
  await prisma.section.create({
    data: {
      examId,
      type: str(formData.get("type")) || "READING",
      durationSec: num(formData.get("durationMin"), 10) * 60,
      order: count + 1,
    },
  });
  revalidatePath(`/admin/de-thi/${examId}`);
}

export async function deleteSection(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  await prisma.section.delete({ where: { id: str(formData.get("sectionId")) } });
  revalidatePath(`/admin/de-thi/${examId}`);
}

/* ---------------- CÂU HỎI ---------------- */

export async function addQuestion(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  const sectionId = str(formData.get("sectionId"));
  const type = str(formData.get("type")) || "MULTIPLE_CHOICE";
  const prompt = str(formData.get("prompt"));
  if (!prompt) throw new Error("Đề bài (prompt) không được để trống.");

  const imageUrl = await saveUpload(formData.get("image") as File | null, "image");
  const audioUrl = await saveUpload(formData.get("audio") as File | null, "audio");

  const count = await prisma.question.count({ where: { sectionId } });

  // Đáp án: 4 ô content + chỉ số đáp án đúng (correct = "1".."4")
  const correct = str(formData.get("correct"));
  const choices: { label: string; content: string; isCorrect: boolean }[] = [];
  if (type === "MULTIPLE_CHOICE") {
    for (let i = 1; i <= 4; i++) {
      const content = str(formData.get(`choice${i}`));
      if (content) {
        choices.push({ label: String(i), content, isCorrect: correct === String(i) });
      }
    }
    if (choices.length < 2) throw new Error("Cần ít nhất 2 đáp án.");
    if (!choices.some((c) => c.isCorrect)) throw new Error("Hãy chọn một đáp án đúng.");
  }

  await prisma.question.create({
    data: {
      sectionId,
      type,
      order: count + 1,
      prompt,
      passage: str(formData.get("passage")) || null,
      points: num(formData.get("points"), 2),
      explanation: str(formData.get("explanation")) || null,
      topic: str(formData.get("topic")) || null,
      imageUrl,
      audioUrl,
      choices: choices.length ? { create: choices } : undefined,
    },
  });
  revalidatePath(`/admin/de-thi/${examId}`);
}

export async function updateQuestion(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  const questionId = str(formData.get("questionId"));
  if (!questionId) throw new Error("Thiếu questionId.");
  const type = str(formData.get("type")) || "MULTIPLE_CHOICE";
  const prompt = str(formData.get("prompt"));
  if (!prompt) throw new Error("Đề bài (prompt) không được để trống.");

  // Chỉ thay ảnh/audio khi người dùng tải file mới, ngược lại giữ nguyên.
  const newImageUrl = await saveUpload(formData.get("image") as File | null, "image");
  const newAudioUrl = await saveUpload(formData.get("audio") as File | null, "audio");

  const correct = str(formData.get("correct"));
  const choices: { label: string; content: string; isCorrect: boolean }[] = [];
  if (type === "MULTIPLE_CHOICE") {
    for (let i = 1; i <= 4; i++) {
      const content = str(formData.get(`choice${i}`));
      if (content) {
        choices.push({ label: String(i), content, isCorrect: correct === String(i) });
      }
    }
    if (choices.length < 2) throw new Error("Cần ít nhất 2 đáp án.");
    if (!choices.some((c) => c.isCorrect)) throw new Error("Hãy chọn một đáp án đúng.");
  }

  await prisma.question.update({
    where: { id: questionId },
    data: {
      type,
      prompt,
      passage: str(formData.get("passage")) || null,
      points: num(formData.get("points"), 2),
      explanation: str(formData.get("explanation")) || null,
      topic: str(formData.get("topic")) || null,
      ...(newImageUrl ? { imageUrl: newImageUrl } : {}),
      ...(newAudioUrl ? { audioUrl: newAudioUrl } : {}),
      // Thay toàn bộ đáp án: xoá cũ rồi tạo lại theo dữ liệu mới.
      choices: {
        deleteMany: {},
        ...(choices.length ? { create: choices } : {}),
      },
    },
  });
  revalidatePath(`/admin/de-thi/${examId}`);
}

export async function deleteQuestion(formData: FormData) {
  await requireAdmin();
  const examId = str(formData.get("examId"));
  await prisma.question.delete({ where: { id: str(formData.get("questionId")) } });
  revalidatePath(`/admin/de-thi/${examId}`);
}

/* ---------------- TỪ VỰNG ---------------- */

export async function createVocab(formData: FormData) {
  await requireAdmin();
  const korean = str(formData.get("korean"));
  const meaningVi = str(formData.get("meaningVi"));
  if (!korean || !meaningVi) throw new Error("Cần nhập từ tiếng Hàn và nghĩa tiếng Việt.");
  await prisma.vocab.create({
    data: {
      level: num(formData.get("level"), 3),
      korean,
      reading: str(formData.get("reading")) || null,
      meaningVi,
      example: str(formData.get("example")) || null,
      topic: str(formData.get("topic")) || null,
    },
  });
  revalidatePath("/admin/tu-vung");
  revalidatePath("/tu-vung");
}

export async function deleteVocab(formData: FormData) {
  await requireAdmin();
  await prisma.vocab.delete({ where: { id: str(formData.get("vocabId")) } });
  revalidatePath("/admin/tu-vung");
  revalidatePath("/tu-vung");
}

/* ---------------- NGỮ PHÁP ---------------- */

export async function createGrammar(formData: FormData) {
  await requireAdmin();
  const pattern = str(formData.get("pattern"));
  const meaningVi = str(formData.get("meaningVi"));
  if (!pattern || !meaningVi) throw new Error("Cần nhập mẫu ngữ pháp và ý nghĩa.");
  await prisma.grammar.create({
    data: {
      level: num(formData.get("level"), 3),
      pattern,
      meaningVi,
      example: str(formData.get("example")) || null,
    },
  });
  revalidatePath("/admin/ngu-phap");
  revalidatePath("/ngu-phap");
}

export async function deleteGrammar(formData: FormData) {
  await requireAdmin();
  await prisma.grammar.delete({ where: { id: str(formData.get("grammarId")) } });
  revalidatePath("/admin/ngu-phap");
  revalidatePath("/ngu-phap");
}

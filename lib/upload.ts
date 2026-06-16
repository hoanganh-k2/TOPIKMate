import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const ALLOWED: Record<"image" | "audio", string[]> = {
  image: ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"],
  audio: ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/x-m4a", "audio/mp4"],
};

const EXT: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "audio/mpeg": ".mp3",
  "audio/mp3": ".mp3",
  "audio/wav": ".wav",
  "audio/ogg": ".ogg",
  "audio/x-m4a": ".m4a",
  "audio/mp4": ".m4a",
};

/**
 * Lưu file upload vào public/uploads và trả về URL công khai "/uploads/<tên>".
 * Trả về null nếu file rỗng (không upload). Ném lỗi nếu sai định dạng.
 */
export async function saveUpload(
  file: File | null,
  kind: "image" | "audio"
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  if (!ALLOWED[kind].includes(file.type)) {
    throw new Error(
      `Định dạng ${kind === "image" ? "ảnh" : "audio"} không hợp lệ: ${file.type}`
    );
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = EXT[file.type] ?? path.extname(file.name) ?? "";
  const filename = `${randomUUID()}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/${filename}`;
}

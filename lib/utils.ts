import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Định dạng giây thành mm:ss (cho đồng hồ làm bài). */
export function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export const SECTION_LABEL: Record<string, string> = {
  LISTENING: "Nghe",
  READING: "Đọc",
  WRITING: "Viết",
};

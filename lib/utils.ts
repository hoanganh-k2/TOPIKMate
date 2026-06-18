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

/**
 * Quy đổi phần trăm điểm sang cấp độ TOPIK II tương đương.
 * Thang chuẩn 0–300: ≥230 (≈77%) cấp 6, ≥190 (≈63%) cấp 5,
 * ≥150 (50%) cấp 4, ≥120 (40%) cấp 3, dưới đó chưa đạt.
 * Dùng % để áp dụng được cho cả đề có maxScore khác 300.
 */
export function topikLevelFromPercent(percent: number): {
  level: number | null;
  label: string;
} {
  if (percent >= 77) return { level: 6, label: "Cấp 6" };
  if (percent >= 63) return { level: 5, label: "Cấp 5" };
  if (percent >= 50) return { level: 4, label: "Cấp 4" };
  if (percent >= 40) return { level: 3, label: "Cấp 3" };
  return { level: null, label: "Chưa đạt cấp 3" };
}

/** Phát âm tiếng Hàn bằng Web Speech API của trình duyệt (không cần thư viện ngoài). */
export function speakKorean(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ko-KR";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

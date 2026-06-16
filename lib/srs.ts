/**
 * Spaced repetition đơn giản theo phương pháp Leitner (5 hộp).
 * - "known" (đã thuộc): chuyển lên hộp cao hơn, giãn thời gian ôn.
 * - "review" (cần ôn): đưa về hộp 1, đến hạn ngay.
 */

export type ReviewResult = "known" | "review";

/** Số ngày tới lần ôn tiếp theo cho mỗi hộp (index = box - 1). */
const INTERVAL_DAYS = [1, 2, 4, 7, 15];
const MAX_BOX = INTERVAL_DAYS.length; // 5

const DAY_MS = 24 * 60 * 60 * 1000;

export interface SrsState {
  box: number;
  dueAt: Date;
}

/** Tính trạng thái mới sau khi người dùng tự đánh giá một thẻ. */
export function nextSrsState(
  current: { box: number } | null,
  result: ReviewResult,
  now: Date = new Date()
): SrsState {
  if (result === "review") {
    return { box: 1, dueAt: now };
  }
  // known → lên hộp kế tiếp (tối đa MAX_BOX)
  const box = Math.min((current?.box ?? 0) + 1, MAX_BOX);
  const days = INTERVAL_DAYS[box - 1];
  return { box, dueAt: new Date(now.getTime() + days * DAY_MS) };
}

/** Một từ đến hạn ôn khi dueAt <= hiện tại. */
export function isDue(dueAt: Date, now: Date = new Date()): boolean {
  return dueAt.getTime() <= now.getTime();
}

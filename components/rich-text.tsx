import { Fragment } from "react";

/**
 * Hiển thị văn bản đề thi có hỗ trợ GẠCH CHÂN bằng cú pháp `[u]...[/u]`.
 * Dùng cho các câu "밑줄 친 부분..." (chọn nghĩa/tâm trạng của phần gạch chân).
 * Phần ngoài cú pháp giữ nguyên (kể cả xuống dòng, vì container dùng whitespace-pre-line).
 */
export function RichText({ text }: { text: string }) {
  const segments = text.split(/(\[u\][\s\S]*?\[\/u\])/g);
  return (
    <>
      {segments.map((seg, i) => {
        const m = /^\[u\]([\s\S]*?)\[\/u\]$/.exec(seg);
        return m ? (
          <u key={i} className="underline decoration-2 underline-offset-4">
            {m[1]}
          </u>
        ) : (
          <Fragment key={i}>{seg}</Fragment>
        );
      })}
    </>
  );
}

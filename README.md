# TOPIKMate — Web ôn thi TOPIK II

Nền tảng ôn luyện **TOPIK II** (tiếng Việt), lấy cảm hứng từ [Migii TOPIK](https://topik.migii.net/vi/).

## Tính năng

- **Thi thử bấm giờ** — làm đề TOPIK II theo phần (Nghe / Đọc / Viết), đếm ngược thời gian, tự động chấm điểm trắc nghiệm và xem lại đáp án kèm giải thích.
- **Luyện theo dạng** — luyện từng câu không giới hạn thời gian, phản hồi đúng/sai ngay, lọc theo phần và chủ đề.
- **Từ vựng** — học bằng flashcard (lật thẻ) hoặc danh sách, lọc theo cấp độ.
- **Ngữ pháp** — mẫu ngữ pháp kèm ý nghĩa & ví dụ, nhóm theo cấp độ.
- **Tài khoản & tiến độ** — đăng ký/đăng nhập, lưu lịch sử bài thi và theo dõi điểm số.
- **Lộ trình** — gợi ý lộ trình ôn thi 3 tháng và mục tiêu theo cấp độ 3–6.

## Công nghệ

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Prisma + SQLite · Auth.js (NextAuth v5) · Zustand · lucide-react.

## Chạy dự án (lần đầu)

```bash
npm install              # cài thư viện (tự chạy prisma generate)
npx prisma migrate dev --name init   # tạo database SQLite
npm run db:seed          # nạp dữ liệu mẫu (đề + từ vựng + ngữ pháp)
npm run dev              # chạy ở http://localhost:3000
```

Tài khoản demo: **demo@topikmate.vn** / **123456**

> Biến môi trường nằm trong `.env` (đã có sẵn cho môi trường dev). Đổi `AUTH_SECRET` khi triển khai thật.

## Nhập đề thi thật

Đề thi nằm trong cơ sở dữ liệu. Cách đơn giản nhất là chỉnh **`prisma/seed.ts`** rồi chạy lại `npm run db:seed`.

Cấu trúc một đề (`Exam`):

```
Exam
 ├─ title         : tên đề (vd. "Đề thi thử TOPIK II — Số 2")
 ├─ targetLevel   : cấp độ mục tiêu 3–6 (tùy chọn)
 ├─ description   : mô tả ngắn
 └─ sections[]    : các phần
      ├─ type        : "LISTENING" | "READING" | "WRITING"
      ├─ durationSec : thời lượng (giây)
      └─ questions[] : câu hỏi
           ├─ prompt      : đề bài (tiếng Hàn)
           ├─ passage     : đoạn đọc/hội thoại (tùy chọn)
           ├─ audioUrl    : link file nghe (tùy chọn, đặt file trong /public)
           ├─ points      : điểm
           ├─ explanation : giải thích (tiếng Việt)
           ├─ topic       : nhãn dạng câu hỏi (để lọc khi luyện tập)
           └─ choices[]   : đáp án — { label, content, isCorrect }
```

- Câu **trắc nghiệm** (`MULTIPLE_CHOICE`): cần đúng **một** `choice` có `isCorrect: true`.
- Câu **tự luận** (`WRITING`, phần Viết): chỉ lưu câu trả lời, **không** tự chấm.
- File nghe (audio): đặt trong thư mục `public/`, ví dụ `public/audio/q1.mp3` rồi đặt `audioUrl: "/audio/q1.mp3"`.

## Lệnh hữu ích

- `npm run db:studio` — mở Prisma Studio để xem/sửa dữ liệu trực quan.
- `npm run build` — build production.

## Phạm vi hiện tại

v1 tập trung **TOPIK II**. Dữ liệu kèm theo là **đề mẫu (giả)** chỉ để minh hoạ — hãy thay bằng đề thật.

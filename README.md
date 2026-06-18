# TOPIKMate — Web ôn thi TOPIK II

Nền tảng ôn luyện **TOPIK II** (tiếng Việt), lấy cảm hứng từ [Migii TOPIK](https://topik.migii.net/vi/).

## Tính năng

- **Thi thử bấm giờ** — làm đề TOPIK II theo phần (Nghe / Đọc / Viết), đếm ngược thời gian, tự động chấm điểm trắc nghiệm và xem lại đáp án kèm giải thích.
- **Chấm phần Viết bằng AI** — câu tự luận (쓰기) được chấm điểm và nhận xét (điểm mạnh / cần cải thiện / gợi ý) bằng AI (Groq, miễn phí). *(Cần `GROQ_API_KEY` — xem bên dưới.)*
- **Luyện theo dạng** — luyện từng câu không giới hạn thời gian, phản hồi đúng/sai ngay, lọc theo phần và chủ đề.
- **Từ vựng + ôn lại (spaced repetition)** — học bằng flashcard, đánh dấu “đã thuộc / cần ôn” và được nhắc ôn lại đúng lúc theo phương pháp Leitner; có bộ lọc “Cần ôn hôm nay”.
- **Ngữ pháp** — mẫu ngữ pháp kèm ý nghĩa & ví dụ, nhóm theo cấp độ.
- **Tài khoản & tiến độ** — đăng ký/đăng nhập, lưu lịch sử bài thi, biểu đồ điểm theo thời gian và phân tích điểm mạnh/yếu theo phần và dạng câu.
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

### Chấm phần Viết bằng AI (tùy chọn, miễn phí)

Đặt khoá API **Groq** (miễn phí) vào `.env` để bật chấm tự luận:

```env
GROQ_API_KEY="gsk_..."   # lấy miễn phí tại https://console.groq.com/keys
```

- Dùng model `llama-3.3-70b-versatile` (đổi trong `lib/writing-grader.ts` nếu muốn).
- Nếu **để trống**, bài thi vẫn nộp và chấm trắc nghiệm bình thường — chỉ phần Viết không có điểm/nhận xét AI.

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
- Câu **tự luận** (`WRITING`, phần Viết): đặt `type: "WRITING"` cho câu hỏi; được chấm bằng AI nếu có `ANTHROPIC_API_KEY` (điểm AI tính theo `points`).
- File nghe (audio): đặt trong thư mục `public/`, ví dụ `public/audio/q1.mp3` rồi đặt `audioUrl: "/audio/q1.mp3"`.

## Lệnh hữu ích

- `npm run db:studio` — mở Prisma Studio để xem/sửa dữ liệu trực quan.
- `npm run build` — build production.

## Phạm vi hiện tại

v1 tập trung **TOPIK II**. Dữ liệu kèm theo là **nội dung minh hoạ** (2 đề mẫu, ~38 từ vựng, ~26 mẫu ngữ pháp) — **không phải đề TOPIK chính thức**, hãy thay bằng đề thật khi có.

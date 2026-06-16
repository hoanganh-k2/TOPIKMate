/**
 * Dữ liệu mẫu cho TOPIKMate (DEMO).
 * ⚠️ Đây là đề GIẢ để minh hoạ chức năng — hãy thay bằng đề TOPIK II thật.
 * Cách nhập đề thật: chỉnh mảng `exams` bên dưới theo đúng cấu trúc, rồi chạy `npm run db:seed`.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Xoá dữ liệu cũ để seed lại sạch sẽ.
  await prisma.attemptAnswer.deleteMany();
  await prisma.attempt.deleteMany();
  await prisma.choice.deleteMany();
  await prisma.question.deleteMany();
  await prisma.section.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.vocab.deleteMany();
  await prisma.grammar.deleteMany();
  await prisma.user.deleteMany();

  // Tài khoản demo (đồng thời là ADMIN để quản trị nội dung)
  await prisma.user.create({
    data: {
      email: "demo@topikmate.vn",
      name: "Người dùng Demo",
      passwordHash: await bcrypt.hash("123456", 10),
      role: "ADMIN",
    },
  });

  // ----- Đề thi thử TOPIK II mẫu -----
  await prisma.exam.create({
    data: {
      title: "Đề thi thử TOPIK II — Số 1 (mẫu)",
      targetLevel: 4,
      description:
        "Đề mẫu minh hoạ chức năng: gồm phần Nghe và Đọc rút gọn. Hãy thay bằng đề thật.",
      isSample: true,
      sections: {
        create: [
          {
            type: "LISTENING",
            order: 1,
            durationSec: 600,
            questions: {
              create: [
                {
                  order: 1,
                  prompt: "다음을 듣고 알맞은 그림을 고르십시오.",
                  passage: "남자: 여기에서 사진을 찍어도 돼요?\n여자: 네, 괜찮아요.",
                  points: 2,
                  topic: "Hội thoại ngắn",
                  explanation:
                    "Người nam hỏi có được chụp ảnh không, người nữ đồng ý → chọn tình huống chụp ảnh.",
                  choices: {
                    create: [
                      { label: "1", content: "Hai người đang chụp ảnh.", isCorrect: true },
                      { label: "2", content: "Hai người đang ăn cơm." },
                      { label: "3", content: "Hai người đang mua vé." },
                      { label: "4", content: "Hai người đang xem phim." },
                    ],
                  },
                },
                {
                  order: 2,
                  prompt: "다음을 듣고 이어질 수 있는 말을 고르십시오.",
                  passage: "여자: 주말에 뭐 할 거예요?\n남자: ____________",
                  points: 2,
                  topic: "Phản hồi phù hợp",
                  explanation:
                    "Câu hỏi về kế hoạch cuối tuần → câu trả lời nói về dự định là phù hợp nhất.",
                  choices: {
                    create: [
                      { label: "1", content: "친구를 만날 거예요. (Tôi sẽ gặp bạn.)", isCorrect: true },
                      { label: "2", content: "어제 비가 왔어요." },
                      { label: "3", content: "저는 학생이 아니에요." },
                      { label: "4", content: "그 영화는 재미없었어요." },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: "READING",
            order: 2,
            durationSec: 700,
            questions: {
              create: [
                {
                  order: 1,
                  prompt: "( )에 들어갈 가장 알맞은 것을 고르십시오.",
                  passage: "날씨가 추워서 두꺼운 옷을 ( ).",
                  points: 2,
                  topic: "Ngữ pháp — chia động từ",
                  explanation:
                    "Vì trời lạnh nên 'mặc' áo dày. Dạng đúng là 입었어요 (đã mặc).",
                  choices: {
                    create: [
                      { label: "1", content: "입었어요", isCorrect: true },
                      { label: "2", content: "먹었어요" },
                      { label: "3", content: "마셨어요" },
                      { label: "4", content: "읽었어요" },
                    ],
                  },
                },
                {
                  order: 2,
                  prompt: "다음 글의 주제로 알맞은 것을 고르십시오.",
                  passage:
                    "운동은 건강에 좋습니다. 매일 30분씩 걷기만 해도 몸이 건강해지고 기분도 좋아집니다.",
                  points: 2,
                  topic: "Đọc hiểu — ý chính",
                  explanation:
                    "Đoạn văn nói về lợi ích của việc vận động đối với sức khỏe → chủ đề là lợi ích của tập thể dục.",
                  choices: {
                    create: [
                      { label: "1", content: "Lợi ích của việc tập thể dục.", isCorrect: true },
                      { label: "2", content: "Cách nấu ăn ngon." },
                      { label: "3", content: "Thời tiết mùa đông." },
                      { label: "4", content: "Cách học tiếng Hàn." },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ----- Từ vựng mẫu -----
  await prisma.vocab.createMany({
    data: [
      { level: 3, korean: "건강", reading: "geon-gang", meaningVi: "sức khỏe", example: "건강이 제일 중요해요.", topic: "Sức khỏe" },
      { level: 3, korean: "운동", reading: "un-dong", meaningVi: "vận động, thể dục", example: "매일 운동을 해요.", topic: "Sức khỏe" },
      { level: 4, korean: "환경", reading: "hwan-gyeong", meaningVi: "môi trường", example: "환경을 보호해야 해요.", topic: "Xã hội" },
      { level: 4, korean: "경험", reading: "gyeong-heom", meaningVi: "kinh nghiệm, trải nghiệm", example: "좋은 경험이었어요.", topic: "Đời sống" },
      { level: 5, korean: "정책", reading: "jeong-chaek", meaningVi: "chính sách", example: "새로운 정책이 발표됐어요.", topic: "Chính trị" },
    ],
  });

  // ----- Ngữ pháp mẫu -----
  await prisma.grammar.createMany({
    data: [
      { level: 3, pattern: "-(으)려고 하다", meaningVi: "định/dự định làm gì", example: "내일 도서관에 가려고 해요." },
      { level: 3, pattern: "-기 때문에", meaningVi: "vì, bởi vì (lý do)", example: "비가 오기 때문에 안 나가요." },
      { level: 4, pattern: "-는 바람에", meaningVi: "do (lý do ngoài ý muốn dẫn đến kết quả xấu)", example: "늦잠을 자는 바람에 지각했어요." },
      { level: 4, pattern: "-(으)ㄴ/는 편이다", meaningVi: "thuộc dạng/khá là...", example: "저는 매운 음식을 잘 먹는 편이에요." },
      { level: 5, pattern: "-(으)ㄹ 뿐만 아니라", meaningVi: "không những... mà còn", example: "그 식당은 음식이 맛있을 뿐만 아니라 친절해요." },
    ],
  });

  console.log("✅ Seed dữ liệu mẫu hoàn tất. Tài khoản demo: demo@topikmate.vn / 123456");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

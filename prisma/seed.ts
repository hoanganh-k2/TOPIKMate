/**
 * Dữ liệu mẫu cho TOPIKMate (DEMO).
 * ⚠️ Đây là nội dung MINH HOẠ do AI tạo để demo chức năng — KHÔNG phải đề TOPIK chính thức.
 * Cách nhập đề thật: chỉnh các mảng bên dưới theo đúng cấu trúc, rồi chạy `npm run db:seed`.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Xoá dữ liệu cũ để seed lại sạch sẽ.
  await prisma.vocabReview.deleteMany();
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

  // ----- Đề thi thử TOPIK II — Số 1 -----
  await prisma.exam.create({
    data: {
      title: "Đề thi thử TOPIK II — Số 1 (mẫu)",
      targetLevel: 4,
      description:
        "Đề mẫu minh hoạ: gồm phần Nghe, Đọc và một câu Viết (chấm bằng AI). Hãy thay bằng đề thật.",
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
                  topic: "Nghe — Hội thoại ngắn",
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
                  topic: "Nghe — Phản hồi phù hợp",
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
                {
                  order: 3,
                  prompt: "다음을 듣고 두 사람이 무엇에 대해 이야기하는지 고르십시오.",
                  passage:
                    "여자: 이 식당은 주말에 사람이 많아서 미리 예약하는 게 좋아요.\n남자: 그래요? 그럼 토요일 저녁으로 예약할까요?",
                  points: 2,
                  topic: "Nghe — Chủ đề hội thoại",
                  explanation:
                    "Hai người bàn về việc đặt bàn trước ở nhà hàng → chủ đề là đặt chỗ nhà hàng.",
                  choices: {
                    create: [
                      { label: "1", content: "Đặt bàn ở nhà hàng.", isCorrect: true },
                      { label: "2", content: "Cách nấu món ăn." },
                      { label: "3", content: "Giá vé xem phim." },
                      { label: "4", content: "Thời tiết cuối tuần." },
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
                  topic: "Đọc — Chia động từ",
                  explanation: "Vì trời lạnh nên 'mặc' áo dày. Dạng đúng là 입었어요 (đã mặc).",
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
                  topic: "Đọc — Ý chính",
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
                {
                  order: 3,
                  prompt: "다음 글을 읽고 내용과 같은 것을 고르십시오.",
                  passage:
                    "한국에서는 설날에 가족들이 모여 떡국을 먹습니다. 떡국을 먹으면 한 살을 더 먹는다고 생각합니다.",
                  points: 2,
                  topic: "Đọc — Chi tiết",
                  explanation:
                    "Bài đọc nói vào Tết (설날) người Hàn quây quần ăn canh bánh gạo (떡국) → chọn đáp án trùng nội dung.",
                  choices: {
                    create: [
                      { label: "1", content: "Vào Tết, người Hàn ăn canh bánh gạo (떡국).", isCorrect: true },
                      { label: "2", content: "떡국 chỉ được ăn vào mùa hè." },
                      { label: "3", content: "Người Hàn không tổ chức Tết." },
                      { label: "4", content: "Ăn 떡국 sẽ trẻ lại một tuổi." },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: "WRITING",
            order: 3,
            durationSec: 1800,
            questions: {
              create: [
                {
                  order: 1,
                  type: "WRITING",
                  prompt:
                    "다음을 주제로 200~300자로 글을 쓰십시오: '내가 좋아하는 계절과 그 이유'.",
                  passage:
                    "Hãy viết một đoạn 200–300 chữ Hàn về mùa bạn yêu thích và lý do. Bài viết sẽ được AI chấm và nhận xét.",
                  points: 10,
                  topic: "Viết — Đoạn văn ngắn",
                  explanation:
                    "Câu tự luận: cần nêu rõ mùa yêu thích, lý do cụ thể, dùng ngữ pháp cấp 3–4, đủ độ dài yêu cầu.",
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ----- Đề thi thử TOPIK II — Số 2 -----
  await prisma.exam.create({
    data: {
      title: "Đề thi thử TOPIK II — Số 2 (mẫu)",
      targetLevel: 5,
      description:
        "Đề mẫu cấp độ cao hơn: tập trung Đọc hiểu nâng cao và một câu Viết. Hãy thay bằng đề thật.",
      isSample: true,
      sections: {
        create: [
          {
            type: "READING",
            order: 1,
            durationSec: 800,
            questions: {
              create: [
                {
                  order: 1,
                  prompt: "( )에 들어갈 가장 알맞은 것을 고르십시오.",
                  passage: "열심히 공부한 ( ) 시험에 합격했어요.",
                  points: 2,
                  topic: "Đọc — Ngữ pháp nâng cao",
                  explanation:
                    "'Nhờ chăm chỉ học' → dùng 덕분에 (nhờ vào, lý do tích cực).",
                  choices: {
                    create: [
                      { label: "1", content: "덕분에", isCorrect: true },
                      { label: "2", content: "때문에" },
                      { label: "3", content: "대신에" },
                      { label: "4", content: "동안에" },
                    ],
                  },
                },
                {
                  order: 2,
                  prompt: "밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오.",
                  passage: "그 일은 생각보다 어렵지 않았다.",
                  points: 2,
                  topic: "Đọc — Đồng nghĩa",
                  explanation:
                    "'Không khó như tưởng' ≈ 쉬운 편이었다 (khá dễ).",
                  choices: {
                    create: [
                      { label: "1", content: "쉬운 편이었다", isCorrect: true },
                      { label: "2", content: "매우 힘들었다" },
                      { label: "3", content: "전혀 못 했다" },
                      { label: "4", content: "시간이 오래 걸렸다" },
                    ],
                  },
                },
                {
                  order: 3,
                  prompt: "다음 글의 글쓴이의 태도로 알맞은 것을 고르십시오.",
                  passage:
                    "최근 스마트폰 사용 시간이 늘면서 사람들의 수면 시간이 줄고 있다. 우리는 이 문제를 심각하게 받아들여야 한다.",
                  points: 2,
                  topic: "Đọc — Thái độ người viết",
                  explanation:
                    "Người viết kêu gọi xem vấn đề một cách nghiêm túc → thái độ lo ngại/cảnh báo.",
                  choices: {
                    create: [
                      { label: "1", content: "Lo ngại và cảnh báo.", isCorrect: true },
                      { label: "2", content: "Vui vẻ, lạc quan." },
                      { label: "3", content: "Thờ ơ, không quan tâm." },
                      { label: "4", content: "Hài hước, châm biếm." },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: "WRITING",
            order: 2,
            durationSec: 1800,
            questions: {
              create: [
                {
                  order: 1,
                  type: "WRITING",
                  prompt:
                    "다음을 주제로 200~300자로 글을 쓰십시오: '스마트폰이 우리 생활에 미치는 영향'.",
                  passage:
                    "Hãy viết một đoạn 200–300 chữ Hàn về ảnh hưởng của điện thoại thông minh đến đời sống. Nêu cả mặt tích cực và tiêu cực.",
                  points: 10,
                  topic: "Viết — Nghị luận ngắn",
                  explanation:
                    "Cần trình bày cả hai mặt, có ví dụ, dùng ngữ pháp cấp 5 và liên kết câu mạch lạc.",
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
      // Cấp 3
      { level: 3, korean: "건강", reading: "geon-gang", meaningVi: "sức khỏe", example: "건강이 제일 중요해요.", topic: "Sức khỏe" },
      { level: 3, korean: "운동", reading: "un-dong", meaningVi: "vận động, thể dục", example: "매일 운동을 해요.", topic: "Sức khỏe" },
      { level: 3, korean: "약속", reading: "yak-sok", meaningVi: "lời hẹn, cuộc hẹn", example: "친구와 약속이 있어요.", topic: "Đời sống" },
      { level: 3, korean: "여행", reading: "yeo-haeng", meaningVi: "du lịch", example: "방학에 여행을 갈 거예요.", topic: "Đời sống" },
      { level: 3, korean: "취미", reading: "chwi-mi", meaningVi: "sở thích", example: "제 취미는 독서예요.", topic: "Đời sống" },
      { level: 3, korean: "계절", reading: "gye-jeol", meaningVi: "mùa", example: "한국은 사계절이 있어요.", topic: "Thiên nhiên" },
      { level: 3, korean: "준비", reading: "jun-bi", meaningVi: "sự chuẩn bị", example: "시험 준비를 해요.", topic: "Học tập" },
      { level: 3, korean: "주말", reading: "ju-mal", meaningVi: "cuối tuần", example: "주말에 쉬어요.", topic: "Thời gian" },
      { level: 3, korean: "음식", reading: "eum-sik", meaningVi: "món ăn, thực phẩm", example: "한국 음식을 좋아해요.", topic: "Ẩm thực" },
      { level: 3, korean: "날씨", reading: "nal-ssi", meaningVi: "thời tiết", example: "오늘 날씨가 좋아요.", topic: "Thiên nhiên" },
      // Cấp 4
      { level: 4, korean: "환경", reading: "hwan-gyeong", meaningVi: "môi trường", example: "환경을 보호해야 해요.", topic: "Xã hội" },
      { level: 4, korean: "경험", reading: "gyeong-heom", meaningVi: "kinh nghiệm, trải nghiệm", example: "좋은 경험이었어요.", topic: "Đời sống" },
      { level: 4, korean: "관계", reading: "gwan-gye", meaningVi: "quan hệ", example: "인간관계가 중요해요.", topic: "Xã hội" },
      { level: 4, korean: "문화", reading: "mun-hwa", meaningVi: "văn hóa", example: "다른 문화를 이해해요.", topic: "Xã hội" },
      { level: 4, korean: "성공", reading: "seong-gong", meaningVi: "thành công", example: "노력하면 성공할 수 있어요.", topic: "Công việc" },
      { level: 4, korean: "기회", reading: "gi-hoe", meaningVi: "cơ hội", example: "좋은 기회를 잡았어요.", topic: "Công việc" },
      { level: 4, korean: "습관", reading: "seup-gwan", meaningVi: "thói quen", example: "좋은 습관을 길러요.", topic: "Đời sống" },
      { level: 4, korean: "변화", reading: "byeon-hwa", meaningVi: "sự thay đổi", example: "큰 변화가 생겼어요.", topic: "Xã hội" },
      { level: 4, korean: "효과", reading: "hyo-gwa", meaningVi: "hiệu quả", example: "운동의 효과가 좋아요.", topic: "Sức khỏe" },
      { level: 4, korean: "참여", reading: "cham-yeo", meaningVi: "sự tham gia", example: "행사에 참여했어요.", topic: "Xã hội" },
      // Cấp 5
      { level: 5, korean: "정책", reading: "jeong-chaek", meaningVi: "chính sách", example: "새로운 정책이 발표됐어요.", topic: "Chính trị" },
      { level: 5, korean: "경제", reading: "gyeong-je", meaningVi: "kinh tế", example: "경제가 어려워요.", topic: "Kinh tế" },
      { level: 5, korean: "사회", reading: "sa-hoe", meaningVi: "xã hội", example: "사회 문제를 해결해요.", topic: "Xã hội" },
      { level: 5, korean: "발전", reading: "bal-jeon", meaningVi: "sự phát triển", example: "기술이 발전했어요.", topic: "Khoa học" },
      { level: 5, korean: "영향", reading: "yeong-hyang", meaningVi: "ảnh hưởng", example: "큰 영향을 미쳐요.", topic: "Xã hội" },
      { level: 5, korean: "현상", reading: "hyeon-sang", meaningVi: "hiện tượng", example: "이상한 현상이에요.", topic: "Khoa học" },
      { level: 5, korean: "해결", reading: "hae-gyeol", meaningVi: "sự giải quyết", example: "문제를 해결했어요.", topic: "Xã hội" },
      { level: 5, korean: "분석", reading: "bun-seok", meaningVi: "phân tích", example: "자료를 분석해요.", topic: "Khoa học" },
      { level: 5, korean: "제도", reading: "je-do", meaningVi: "chế độ, thể chế", example: "교육 제도를 바꿔요.", topic: "Chính trị" },
      { level: 5, korean: "가치", reading: "ga-chi", meaningVi: "giá trị", example: "전통의 가치를 지켜요.", topic: "Xã hội" },
      // Cấp 6
      { level: 6, korean: "지속", reading: "ji-sok", meaningVi: "sự duy trì, bền vững", example: "지속 가능한 발전이 필요해요.", topic: "Môi trường" },
      { level: 6, korean: "혁신", reading: "hyeok-sin", meaningVi: "đổi mới, cách tân", example: "기술 혁신을 이뤘어요.", topic: "Khoa học" },
      { level: 6, korean: "갈등", reading: "gal-deung", meaningVi: "mâu thuẫn, xung đột", example: "세대 갈등이 심해요.", topic: "Xã hội" },
      { level: 6, korean: "전망", reading: "jeon-mang", meaningVi: "triển vọng, dự báo", example: "경제 전망이 밝아요.", topic: "Kinh tế" },
      { level: 6, korean: "규제", reading: "gyu-je", meaningVi: "sự quản chế, quy định", example: "정부가 규제를 강화했어요.", topic: "Chính trị" },
      { level: 6, korean: "성숙", reading: "seong-suk", meaningVi: "sự trưởng thành, chín muồi", example: "성숙한 시민 의식이 필요해요.", topic: "Xã hội" },
      { level: 6, korean: "협력", reading: "hyeop-ryeok", meaningVi: "sự hợp tác", example: "국제 협력이 중요해요.", topic: "Chính trị" },
      { level: 6, korean: "인식", reading: "in-sik", meaningVi: "nhận thức", example: "환경에 대한 인식이 높아졌어요.", topic: "Xã hội" },
    ],
  });

  // ----- Ngữ pháp mẫu -----
  await prisma.grammar.createMany({
    data: [
      // Cấp 3
      { level: 3, pattern: "-(으)려고 하다", meaningVi: "định/dự định làm gì", example: "내일 도서관에 가려고 해요." },
      { level: 3, pattern: "-기 때문에", meaningVi: "vì, bởi vì (lý do)", example: "비가 오기 때문에 안 나가요." },
      { level: 3, pattern: "-(으)ㄴ 적이 있다", meaningVi: "đã từng làm gì", example: "한국에 간 적이 있어요." },
      { level: 3, pattern: "-아/어도 되다", meaningVi: "được phép làm gì", example: "여기 앉아도 돼요?" },
      { level: 3, pattern: "-(으)면서", meaningVi: "vừa... vừa (đồng thời)", example: "음악을 들으면서 공부해요." },
      { level: 3, pattern: "-기로 하다", meaningVi: "quyết định làm gì", example: "내일부터 운동하기로 했어요." },
      { level: 3, pattern: "-(으)ㄹ 것 같다", meaningVi: "có lẽ, hình như sẽ", example: "비가 올 것 같아요." },
      { level: 3, pattern: "-아/어 보다", meaningVi: "thử làm gì", example: "이 음식을 먹어 보세요." },
      // Cấp 4
      { level: 4, pattern: "-는 바람에", meaningVi: "do (lý do ngoài ý muốn dẫn đến kết quả xấu)", example: "늦잠을 자는 바람에 지각했어요." },
      { level: 4, pattern: "-(으)ㄴ/는 편이다", meaningVi: "thuộc dạng/khá là...", example: "저는 매운 음식을 잘 먹는 편이에요." },
      { level: 4, pattern: "-(으)ㄹ수록", meaningVi: "càng... càng", example: "공부할수록 재미있어요." },
      { level: 4, pattern: "-는 대신에", meaningVi: "thay vì, bù lại", example: "외식하는 대신에 집에서 요리해요." },
      { level: 4, pattern: "-더라도", meaningVi: "dù cho, cho dù", example: "힘들더라도 포기하지 마세요." },
      { level: 4, pattern: "-(으)ㄴ/는 데다가", meaningVi: "thêm vào đó, vừa... lại còn", example: "값이 싼 데다가 품질도 좋아요." },
      { level: 4, pattern: "-기 마련이다", meaningVi: "đương nhiên sẽ, lẽ thường", example: "노력하면 성공하기 마련이에요." },
      { level: 4, pattern: "-(으)ㄹ 뿐이다", meaningVi: "chỉ... mà thôi", example: "최선을 다할 뿐이에요." },
      // Cấp 5
      { level: 5, pattern: "-(으)ㄹ 뿐만 아니라", meaningVi: "không những... mà còn", example: "그 식당은 음식이 맛있을 뿐만 아니라 친절해요." },
      { level: 5, pattern: "-(으)ㄴ/는 셈이다", meaningVi: "coi như là, xem như", example: "거의 다 끝낸 셈이에요." },
      { level: 5, pattern: "-(으)ㅁ에도 불구하고", meaningVi: "mặc dù... nhưng vẫn", example: "어려움에도 불구하고 성공했어요." },
      { level: 5, pattern: "-(으)ㄴ/는 만큼", meaningVi: "tương xứng với, vì... nên", example: "노력한 만큼 결과가 좋아요." },
      { level: 5, pattern: "-기는커녕", meaningVi: "đừng nói là... ngay cả", example: "쉬기는커녕 더 바빠졌어요." },
      { level: 5, pattern: "-(으)ㄹ 지경이다", meaningVi: "đến mức, tới nỗi", example: "배가 고파서 쓰러질 지경이에요." },
      // Cấp 6
      { level: 6, pattern: "-(으)ㄴ/는 데 반해", meaningVi: "trái lại, ngược lại với", example: "형은 활발한 데 반해 동생은 조용해요." },
      { level: 6, pattern: "-(으)ㄹ 따름이다", meaningVi: "chỉ biết... mà thôi (trang trọng)", example: "감사할 따름입니다." },
      { level: 6, pattern: "-(느)ㄴ다기보다는", meaningVi: "thay vì nói là... thì đúng hơn là", example: "싫다기보다는 관심이 없어요." },
      { level: 6, pattern: "-(으)ㄹ 법하다", meaningVi: "có vẻ hợp lý, đáng lẽ", example: "그럴 법한 이야기예요." },
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

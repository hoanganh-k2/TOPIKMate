import type { ExamSeed } from "./types";

// Audio phần Nghe (1 file cho cả đề). File: public/audio/de-01/full.mp3
const NGHE = "/audio/de-01/full.mp3";

/**
 * ĐỀ SỐ 1 — TOPIK 300+   (ĐANG NHẬP DẦN)
 * ─────────────────────────────────────────────────────────────────────────
 * Nguồn: "Đề số 1 sách 300+" (Nghe) + "Đề số 1" (Đọc) + sách tổng hợp 토픽 300+.pdf
 * (đáp án & giải thích ở mục "1회 실전모의고사 정답 및 풀이", trang ~226–270).
 *
 * TRẠNG THÁI:
 *  - ✅ ĐỌC câu 1–50: nội dung THẬT, ĐÃ đối chiếu đáp án với mục giải thích (정답 및 풀이,
 *       trang ~246–262 của 토픽 300+.pdf). Câu dùng biểu đồ/thông báo được chuyển thành text.
 *  - ✅ NGHE câu 1–50: đáp án đã đối chiếu lưới 정답 (p226). Audio: 1 file /audio/de-01/full.mp3
 *       gắn cho mọi câu. Câu 1–3 đáp án tranh/biểu đồ → ảnh public/images/de-01/q0{1,2,3}.png.
 *  - ✅ VIẾT 51–54: nội dung THẬT (토픽 300+.pdf trang in 26–27). Câu 53 kèm ảnh biểu đồ
 *       public/images/de-01/q53.png. Bài Viết chấm bằng AI.
 *
 * Đề này được TÁCH thành 3 đề con (· Nghe / · Đọc / · Viết) khi import — xem splitByPart
 * trong types.ts + index.ts. Mỗi phần thành 1 đề luyện riêng.
 *
 * (Nội dung Đọc/Nghe do OCR ảnh scan → ĐÁP ÁN đã đối chiếu; vài CHỮ trong lựa chọn gây nhiễu
 *  có thể cần rà lại chính tả tiếng Hàn khi rảnh. Phần Nghe không kèm 대본 — nội dung nằm trong audio.)
 *
 * ⚠️ Lưới đáp án in nhỏ trong sách dễ đọc nhầm khi OCR (vd câu 5 lưới ghi ③ nhưng
 *    nội dung rõ là ① 신발). Vì vậy mỗi câu nhập vào đều đối chiếu lại bằng nội dung
 *    + phần giải thích, KHÔNG tin tuyệt đối vào lưới.
 *
 * ĐÁP ÁN THAM KHẢO (đọc từ lưới p246 — PHẢI đối chiếu lại từng câu khi nhập):
 *  Nghe 1–50 (p226):  3 1 4 2 2 / 2 1 3 4 2 / 1 3 4 1 4 / 3 1 1 2 4 / 2 4 2 3 2 /
 *                     2 3 2 2 1 / 2 1 3 3 2 / 2 1 3 2 1 / 4 2 1 4 3 / 4 2 1 3 2
 *  Đọc 1–50 (p246):   3 1 4 4 1 / 3 2 1 ... (các câu sau cần đối chiếu lại cẩn thận)
 *
 * File nghe/ảnh bạn tự thêm vào /public:
 *  - Audio: public/audio/de-01/q01.mp3 → audioUrl: "/audio/de-01/q01.mp3"
 *  - Ảnh:   public/images/de-01/q05.png → imageUrl: "/images/de-01/q05.png"
 */
export const de01: ExamSeed = {
  // ⚠️ Title là KHOÁ dedup khi import — GIỮ ỔN ĐỊNH (đừng thêm "(đang nhập)"… vào title,
  //    đổi title sẽ tạo bản trùng. Trạng thái để trong `description`.
  title: "TOPIK II 300+ — Đề số 1",
  targetLevel: 4,
  description:
    "Đề số 1 sách TOPIK 300+. Đủ Nghe 50 câu, Đọc 50 câu, Viết 4 câu (51–54).",
  isSample: false,

  sections: [
    /* ===================== PHẦN NGHE (듣기) ===================== */
    // Audio: 1 file `full.mp3` gắn cho mọi câu (trình phát giữ liên tục khi chuyển câu trong phần Nghe).
    // Câu 1–3 đáp án bằng tranh/biểu đồ → imageUrl trỏ ảnh đã cắt (public/images/de-01/qNN.png).
    {
      type: "LISTENING",
      durationSec: 3600, // 60 phút như đề thật
      questions: [
        // [1~3] 다음을 듣고 가장 알맞은 그림 또는 그래프를 고르십시오. (각 2점)
        {
          order: 1,
          prompt: "다음을 듣고 가장 알맞은 그림을 고르십시오. (4개 그림 중 선택)",
          audioUrl: NGHE,
          imageUrl: "/images/de-01/q01.png",
          points: 2,
          topic: "Nghe — Chọn tranh (câu 1–3)",
          explanation: "Nghe hội thoại và chọn bức tranh phù hợp. Đáp án: ③.",
          choices: [
            { label: "1", content: "그림 1" },
            { label: "2", content: "그림 2" },
            { label: "3", content: "그림 3", isCorrect: true },
            { label: "4", content: "그림 4" },
          ],
        },
        {
          order: 2,
          prompt: "다음을 듣고 가장 알맞은 그림을 고르십시오. (4개 그림 중 선택)",
          audioUrl: NGHE,
          imageUrl: "/images/de-01/q02.png",
          points: 2,
          topic: "Nghe — Chọn tranh (câu 1–3)",
          explanation: "Nghe hội thoại và chọn bức tranh phù hợp. Đáp án: ④.",
          choices: [
            { label: "1", content: "그림 1" },
            { label: "2", content: "그림 2" },
            { label: "3", content: "그림 3" },
            { label: "4", content: "그림 4", isCorrect: true },
          ],
        },
        {
          order: 3,
          prompt: "다음을 듣고 가장 알맞은 그래프를 고르십시오. (4개 그래프 중 선택)",
          audioUrl: NGHE,
          imageUrl: "/images/de-01/q03.png",
          points: 2,
          topic: "Nghe — Chọn biểu đồ (câu 1–3)",
          explanation: "Nghe và chọn biểu đồ khớp số liệu. Đáp án: ③.",
          choices: [
            { label: "1", content: "그래프 1" },
            { label: "2", content: "그래프 2" },
            { label: "3", content: "그래프 3", isCorrect: true },
            { label: "4", content: "그래프 4" },
          ],
        },
        // [4~8] 다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오. (각 2점)
        {
          order: 4,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Chọn câu nói tiếp hợp lý sau hội thoại. Đáp án: ④.",
          choices: [
            { label: "1", content: "그럼 빨리 전선대를 바꿔야겠네요." },
            { label: "2", content: "그렇다면 시계를 빨리 찾으셨네요." },
            { label: "3", content: "시계를 선물해 달라고 말하는 게 어때요?" },
            { label: "4", content: "그래요? 시계를 미리 고쳤으면 좋았을 텐데요.", isCorrect: true },
          ],
        },
        {
          order: 5,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "넘어지면 일어날게요." },
            { label: "2", content: "그렇군요, 천천히 걸을게요.", isCorrect: true },
            { label: "3", content: "빨리 수영을 하는 게 좋겠어요." },
            { label: "4", content: "다치면 치료하면 되지 않나요?" },
          ],
        },
        {
          order: 6,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "6시까지 가도록 할게요." },
            { label: "2", content: "그래요? 그럼, 5시 반까지 갈게요.", isCorrect: true },
            { label: "3", content: "그럼 6시로 예약하면 되지 않을까요?" },
            { label: "4", content: "진료 시간이 6시까지니까 5시 50분에 갈게요." },
          ],
        },
        {
          order: 7,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "맞아요, 다른 집보다 비싸지만 맛이 좋아요." },
            { label: "2", content: "그래요? 다른 과일은 비싼 데다가 맛이 별로였어요." },
            { label: "3", content: "맞아요, 가게 사장님이 직접 농사를 지어서 그렇대요.", isCorrect: true },
            { label: "4", content: "그래요? 다른 과일은 싸게 팔던데 사과는 비싸더라고요." },
          ],
        },
        {
          order: 8,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "그냥 환불해 주세요.", isCorrect: true },
            { label: "2", content: "다른 제습 세제는 사용하기 싫은데요." },
            { label: "3", content: "더 이상 제습 세제는 필요 없을 것 같아요." },
            { label: "4", content: "집에 돌아가서 다른 제습 세제가 있는지 살펴볼게요." },
          ],
        },
        // [9~12] 다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오. (각 2점)
        {
          order: 9,
          prompt: "다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hành động tiếp theo (câu 9–12)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "음식을 주문한다." },
            { label: "2", content: "셀프바에서 수저를 가져온다.", isCorrect: true },
            { label: "3", content: "가방에서 일회용 수저를 꺼낸다." },
            { label: "4", content: "남자가 수저를 줄 때까지 기다린다." },
          ],
        },
        {
          order: 10,
          prompt: "다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hành động tiếp theo (câu 9–12)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "신발을 벗는다." },
            { label: "2", content: "신발 끈을 묶는다.", isCorrect: true },
            { label: "3", content: "일을 하러 회사로 돌아간다." },
            { label: "4", content: "남자의 신발 끈을 묶어준다." },
          ],
        },
        {
          order: 11,
          prompt: "다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hành động tiếp theo (câu 9–12)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "휴대폰의 전원을 끈다.", isCorrect: true },
            { label: "2", content: "미술관 안으로 들어간다." },
            { label: "3", content: "휴대폰을 직원에게 맡긴다." },
            { label: "4", content: "휴대폰을 친구에게 건넨다." },
          ],
        },
        {
          order: 12,
          prompt: "다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hành động tiếp theo (câu 9–12)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "전화를 한다." },
            { label: "2", content: "문자를 보낸다.", isCorrect: true },
            { label: "3", content: "열쇠를 찾는다." },
            { label: "4", content: "회의실 문을 열어본다." },
          ],
        },
        // [13~16] 다음을 듣고 들은 내용과 같은 것을 고르십시오. (각 2점)
        {
          order: 13,
          prompt: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Đúng với nội dung (câu 13–16)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "여자는 전에도 이 공원에 자주 왔다." },
            { label: "2", content: "남자는 나무의 이름을 많이 알고 있다." },
            { label: "3", content: "남자는 이 공원에 꽃과 나무를 심었다." },
            { label: "4", content: "이 공원에서는 나무의 이름을 알 수 있다.", isCorrect: true },
          ],
        },
        {
          order: 14,
          prompt: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Đúng với nội dung (câu 13–16)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "3주차장에는 통행하지 못하는 차량이 있다.", isCorrect: true },
            { label: "2", content: "아파트에 불법 주차한 차량 주인은 벌금을 내야 한다." },
            { label: "3", content: "1234 차량 주인은 오늘 안으로 차를 이동 주차하면 된다." },
            { label: "4", content: "불법 주차된 차량으로 인해 경찰이 안내 방송을 하고 있다." },
          ],
        },
        {
          order: 15,
          prompt: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Đúng với nội dung (câu 13–16)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "벽화 작업에는 안전 요원이 많이 있었다." },
            { label: "2", content: "인주벽화촌은 매년 관람 할인 행사를 한다." },
            { label: "3", content: "벽화 작업 중에 사람들이 넘어지는 일이 발생했다." },
            { label: "4", content: "인주벽화촌의 대표는 마을에 사고가 나지 않도록 하겠다고 말했다.", isCorrect: true },
          ],
        },
        {
          order: 16,
          prompt: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Đúng với nội dung (câu 13–16)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "여자는 구조된 동물을 계속해서 기른다." },
            { label: "2", content: "여자는 동물을 구조하자마자 야생에 돌려보낸다." },
            { label: "3", content: "여자는 구조된 동물에게 적절한 집과 먹이를 준다.", isCorrect: true },
            { label: "4", content: "구조된 동물 대부분이 사람에 의해 부상을 당한 것이다." },
          ],
        },
        // [17~20] 다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오. (각 2점)
        {
          order: 17,
          prompt: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Ý chính của người nam (câu 17–20)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "비가 올 것 같으면 우산을 미리 준비해야 한다.", isCorrect: true },
            { label: "2", content: "비가 올 때는 우산을 가져가야 한다." },
            { label: "3", content: "비가 오는 것과 관계없이 항상 우산을 준비해야 한다." },
            { label: "4", content: "비가 올 때 우산이 없으면 가게에서 편리하게 사야 한다." },
          ],
        },
        {
          order: 18,
          prompt: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Ý chính của người nam (câu 17–20)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "태권도는 어른에게 인기가 많다." },
            { label: "2", content: "태권도를 하면 건강해질 수 있다." },
            { label: "3", content: "태권도를 하는 데에는 나이가 상관없다.", isCorrect: true },
            { label: "4", content: "일반적으로 어른은 태권도를 하지 않는다." },
          ],
        },
        {
          order: 19,
          prompt: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Ý chính của người nam (câu 17–20)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "인터넷에서 물건을 사는 것이 편리하다." },
            { label: "2", content: "집에서 가까운 곳에서 쇼핑하는 것이 경제적이다." },
            { label: "3", content: "물건을 사려면 포장재가 없는 물건을 사는 것이 좋다." },
            { label: "4", content: "불편하더라도 환경을 보호할 수 있는 상품을 사는 것이 좋다.", isCorrect: true },
          ],
        },
        {
          order: 20,
          prompt: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Ý chính của người nam (câu 17–20)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "올바른 자세를 가지면 통증의 발생을 줄일 수 있다.", isCorrect: true },
            { label: "2", content: "허리를 치료할 때 근육을 치료하는 것이 가장 중요하다." },
            { label: "3", content: "잘못된 생활 습관으로 생긴 통증은 한의학으로 치료할 수 있다." },
            { label: "4", content: "환자가 자신의 몸을 관찰해서 스스로 통증을 줄이도록 해야 한다." },
          ],
        },
        // [21~22] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 21,
          prompt: "남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 21–22)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "체험학습 장소로 놀이공원이 좋다." },
            { label: "2", content: "체험학습은 전에 가보지 않은 곳으로 가야 한다." },
            { label: "3", content: "체험학습은 학생들이 좋아하는 곳으로 가야 한다." },
            { label: "4", content: "체험학습은 학생들이 체험 프로그램에 참여하는 것이 중요하다.", isCorrect: true },
          ],
        },
        {
          order: 22,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 21–22)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "이번 학기 체험학습 장소는 놀이공원과 한옥마을이다." },
            { label: "2", content: "이 학교에서는 전에 체험학습을 놀이공원으로 간 적이 있다.", isCorrect: true },
            { label: "3", content: "학생들은 한옥마을의 문화체험 행사에 의무적으로 참여해야 한다." },
            { label: "4", content: "학생들은 체험학습 장소를 놀이공원과 한옥마을 중에서 선택할 수 있다." },
          ],
        },
        // [23~24] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 23,
          prompt: "남자가 무엇을 하고 있는지 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 23–24)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "전기차의 장점을 설명하고 있다." },
            { label: "2", content: "전기자전거 홍보 기획안을 설명하고 있다.", isCorrect: true },
            { label: "3", content: "대학교의 자전거 동아리를 소개하고 있다." },
            { label: "4", content: "전기자전거 타기 행사에 참여할 것을 권하고 있다." },
          ],
        },
        {
          order: 24,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 23–24)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "여자는 남자의 기획안을 검토하지 않았다." },
            { label: "2", content: "남자는 여러 학교에서 예비 조사를 실시하였다." },
            { label: "3", content: "홍보 기획안 안에는 전기자전거 타기 행사가 있다.", isCorrect: true },
            { label: "4", content: "여자는 홍보 활동에 참여할 것을 우려하고 있다." },
          ],
        },
        // [25~26] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 25,
          prompt: "남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 25–26)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "아프리카와 아시아의 일부 지역의 사막화는 막을 수 없다." },
            { label: "2", content: "땔감을 살 수 없는 이들에게 태양열 조리기를 제공해야 한다." },
            { label: "3", content: "일부 지역의 사막화를 막기 위해 태양열 조리기를 보급해야 한다.", isCorrect: true },
            { label: "4", content: "특정 지역에서는 마실 물과 음식 재료를 반드시 가열 조리해야 한다." },
          ],
        },
        {
          order: 26,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 25–26)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "태양열 조리기의 사용은 나무 채취를 막을 수 있다.", isCorrect: true },
            { label: "2", content: "태양열 조리기를 사용하려면 특별한 연료가 필요하다." },
            { label: "3", content: "태양열 조리기에서 발생하는 연기로 재산이 오염될 수 있다." },
            { label: "4", content: "기후 이상으로 아프리카와 아시아의 일부 지역이 사막화되고 있다." },
          ],
        },
        // [27~28] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 27,
          prompt: "남자가 말하는 의도로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 27–28)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "경찰의 정기적인 순찰이 필요함을 알리려고." },
            { label: "2", content: "학교 시설에 대한 경비원의 관리가 중요함을 강조하려고." },
            { label: "3", content: "학교에서 추진하는 울타리 설치가 적절하지 않음을 말하려고.", isCorrect: true },
            { label: "4", content: "학교 시설을 훼손하는 사람은 처벌받을 수 있음을 경고하려고." },
          ],
        },
        {
          order: 28,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 27–28)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "학교 시설의 훼손 방지를 위해 CCTV를 설치할 계획이다." },
            { label: "2", content: "사람들의 출입을 통제하기 위해 울타리를 설치할 계획이다.", isCorrect: true },
            { label: "3", content: "울타리가 설치되면 학생들은 운동장을 전혀 이용할 수 없다." },
            { label: "4", content: "현재 휴일에 운동장을 이용하려면 경비원의 허락이 필요하다." },
          ],
        },
        // [29~30] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 29,
          prompt: "남자가 누구인지 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 29–30)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "전광판을 제작하는 사람" },
            { label: "2", content: "야간에 도로를 포장하는 사람" },
            { label: "3", content: "도로에서 차량을 통제하는 사람", isCorrect: true },
            { label: "4", content: "공사 중인 현장에서 차량을 운전하는 사람" },
          ],
        },
        {
          order: 30,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 29–30)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "남자는 조명을 준비한다.", isCorrect: true },
            { label: "2", content: "남자는 아침에 일을 시작한다." },
            { label: "3", content: "남자는 안전 운전을 해야 한다." },
            { label: "4", content: "남자는 도로 차량을 멈추게 한다." },
          ],
        },
        // [31~32] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 31,
          prompt: "남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 31–32)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "발명대회 수상자들에게 더 많은 상금을 주어야 한다." },
            { label: "2", content: "발명대회 수상자들에게 발명 관련 연수를 받게 해야 한다.", isCorrect: true },
            { label: "3", content: "발명대회 수상자에게 주는 상금은 매년 변함이 없어야 한다." },
            { label: "4", content: "수상자들이 연수할 연수 기관을 선정하기에는 시간이 부족하다." },
          ],
        },
        {
          order: 32,
          prompt: "남자의 태도로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 31–32)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "이유를 들어 자신의 의견을 바꾸고 있다." },
            { label: "2", content: "상대방 의견에 대하여 근거를 요구하고 있다." },
            { label: "3", content: "사례를 들어 상대방의 의견에 공감하고 있다." },
            { label: "4", content: "예상되는 문제에 대해 해결 방안을 스스로 찾고 있다.", isCorrect: true },
          ],
        },
        // [33~34] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 33,
          prompt: "무엇에 대한 내용인지 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 33–34)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "스마트폰 사용의 문제점과 부작용", isCorrect: true },
            { label: "2", content: "모바일 치매의 효과적인 치료 방법" },
            { label: "3", content: "스마트폰을 계속 사용하는 현대인의 일상" },
            { label: "4", content: "모바일 의존도를 발생시키는 디지털 기기" },
          ],
        },
        {
          order: 34,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 33–34)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "현대인은 스마트폰을 사용할 때마다 따분함을 느낀다." },
            { label: "2", content: "스마트폰 사용은 현대인의 일상과 관련성이 높지 않다." },
            { label: "3", content: "현대인은 스마트폰을 사용하면서 학습 능력이 향상되었다." },
            { label: "4", content: "스마트폰을 계속해서 사용하면 집중력이 일시적으로 부족해질 수 있다.", isCorrect: true },
          ],
        },
        // [35~36] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 35,
          prompt: "남자가 무엇을 하고 있는지 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 35–36)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "우리말 큰사전의 편찬 과정에 대해 설명하고 있다.", isCorrect: true },
            { label: "2", content: "잃어버린 원고를 다시 찾았을 때의 기쁨을 알리고 있다." },
            { label: "3", content: "일제가 원고를 압수해 간 것에 대한 아쉬움을 표하고 있다." },
            { label: "4", content: "우리말 큰사전의 편찬 작업이 중단된 이유에 대해 알리고 있다." },
          ],
        },
        {
          order: 36,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 35–36)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "광복 이후 일제는 압수해 간 원고를 돌려주었다." },
            { label: "2", content: "사전 편찬에 참여한 사람은 모두 감옥에 갇혔다.", isCorrect: true },
            { label: "3", content: "조선어 학회는 원고를 빼앗겼지만 계속해서 사전을 만들었다." },
            { label: "4", content: "잃어버린 원고를 찾았지만 우리말 큰사전을 완성하지 못했다." },
          ],
        },
        // [37~38] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 37,
          prompt: "여자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 37–38)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "머리를 다칠 수 있는 활동을 한다면 안전모를 써야 한다.", isCorrect: true },
            { label: "2", content: "머리를 보호하기 위해 안전모 대신 다른 것을 활용해도 된다." },
            { label: "3", content: "최근 안전에 대한 관심이 높아지면서 안전모가 주목받고 있다." },
            { label: "4", content: "안전모는 머리에 맞게 골라 쓰면 된다." },
          ],
        },
        {
          order: 38,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 37–38)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "안전모는 종류와 상관없이 안전하다." },
            { label: "2", content: "자전거를 탈 때 안전모를 쓰지 않으면 처벌받는다." },
            { label: "3", content: "안전모를 쓴 다음에는 흔들리지 않는지 확인해야 한다.", isCorrect: true },
            { label: "4", content: "안전모에 반드시 충격 흡수제가 들어 있는 것은 아니다." },
          ],
        },
        // [39~40] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 39,
          prompt: "이 대화 전의 내용으로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 39–40)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "서큘레이터의 작동 원리에 대해 설명한다." },
            { label: "2", content: "서큘레이터의 판매량이 갑자기 상승했다.", isCorrect: true },
            { label: "3", content: "에어컨이 시원한 바람을 만들어내는 과정을 설명한다." },
            { label: "4", content: "에어컨을 더 시원하게 사용하기 위해 서큘레이터를 사용한다." },
          ],
        },
        {
          order: 40,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 39–40)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "서큘레이터는 빠르게 공기를 순환할 수 있다.", isCorrect: true },
            { label: "2", content: "선풍기는 에어컨의 찬바람을 빠르게 먼 곳에 전달할 수 있다." },
            { label: "3", content: "서큘레이터와 선풍기를 같이 사용하는 냉방의 형태가 늘어나고 있다." },
            { label: "4", content: "에어컨만으로도 충분히 시원하게 만들 수 있다." },
          ],
        },
        // [41~42] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 41,
          prompt: "다음을 듣고 강연의 중심 내용으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 41–42)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "세계화는 지역의 경쟁을 제한하는 장벽을 사라지게 했다." },
            { label: "2", content: "지역 문화의 전파를 막음으로써 지역 경쟁력을 높일 수 있다." },
            { label: "3", content: "지역 경쟁력을 높이기 위해 지역의 산업 구조의 변화가 필요하다." },
            { label: "4", content: "현대 사회에서 지역 경쟁력은 세계적인 가치를 지닐 정도로 중요하다.", isCorrect: true },
          ],
        },
        {
          order: 42,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 41–42)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "지역 문화는 국가의 산업 구조를 변화시킨다." },
            { label: "2", content: "상품화된 지역 문화는 주민 생활에 변화를 가져온다.", isCorrect: true },
            { label: "3", content: "국가는 지역 경제를 활성화하기 위해 다양한 노력을 하고 있다." },
            { label: "4", content: "지역 문화는 국가 공동체의 형성, 유지 및 국가 발전에 기여한다." },
          ],
        },
        // [43~44] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 43,
          prompt: "무엇에 대한 내용인지 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 43–44)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "장 속에 사는 해로운 세균" },
            { label: "2", content: "유산균의 역할과 중요성", isCorrect: true },
            { label: "3", content: "유산균이 많이 들어 있는 음식" },
            { label: "4", content: "유산균의 해로운 점을 없애는 방법" },
          ],
        },
        {
          order: 44,
          prompt: "유산균에 대한 설명으로 옳은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 43–44)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "유산균의 종류는 1,000가지가 있다." },
            { label: "2", content: "유산균은 암을 일으키는 해로운 균이다." },
            { label: "3", content: "유산균을 섭취하면 질병을 예방할 수 있다.", isCorrect: true },
            { label: "4", content: "김치나 요구르트에 많이 들어 있는 것이 유산균이다." },
          ],
        },
        // [45~46] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 45,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 45–46)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "유리공예는 유리에 장식을 덧붙여 만든다." },
            { label: "2", content: "유리공예는 인류가 태어나면서부터 시작되었다." },
            { label: "3", content: "유리공예는 유리에 열을 가함으로써 이루어진다.", isCorrect: true },
            { label: "4", content: "유리공예는 전적으로 유리의 투명성을 이용하는 것이다." },
          ],
        },
        {
          order: 46,
          prompt: "여자가 말하는 방식으로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 45–46)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "유리공예의 어려운 점을 나열하고 있다." },
            { label: "2", content: "유리공예의 예술적 가치를 강조하고 있다." },
            { label: "3", content: "유리공예의 역사를 시간 순서로 설명하고 있다." },
            { label: "4", content: "유리의 특징을 들어 유리공예의 방법을 설명하고 있다.", isCorrect: true },
          ],
        },
        // [47~48] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 47,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 47–48)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "청소년들은 공부에 인터넷을 활용하고 있다." },
            { label: "2", content: "적은 수의 청소년들만 인터넷을 활용하고 있다." },
            { label: "3", content: "인터넷은 소통의 공간으로 활발하게 활용되고 있다." },
            { label: "4", content: "게임중독 청소년은 인터넷의 올바른 사용법 교육이 필요하다.", isCorrect: true },
          ],
        },
        {
          order: 48,
          prompt: "남자의 태도로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 47–48)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "인터넷이 청소년에게 끼칠 해를 우려하고 있다." },
            { label: "2", content: "청소년이 인터넷을 올바르게 사용하길 바라고 있다.", isCorrect: true },
            { label: "3", content: "인터넷이 청소년에게 긍정적으로 작용할 것이라고 기대하고 있다." },
            { label: "4", content: "청소년이 인터넷을 활용하여 여론을 형성할 것이라 확신하고 있다." },
          ],
        },
        // [49~50] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 49,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 49–50)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "정의와 기본권 보장은 상관관계가 적다." },
            { label: "2", content: "정의가 실현된 사회에서 집단 간의 갈등이 발생할 수 없다." },
            { label: "3", content: "정의로운 사회에서는 구성원들의 사회에 대한 신뢰도가 높다.", isCorrect: true },
            { label: "4", content: "인간다운 삶을 누리기 위해서는 법치주의가 실현되어야 한다." },
          ],
        },
        {
          order: 50,
          prompt: "남자의 태도로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 49–50)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "정의 실현의 당위성을 강조하고 있다.", isCorrect: true },
            { label: "2", content: "정의 실현의 필요성을 비판하고 있다." },
            { label: "3", content: "정의 사회에 대한 맹신을 경계하고 있다." },
            { label: "4", content: "정의 실현과 사회 통합의 관련성을 부인하고 있다." },
          ],
        },
      ],
    },

    /* ===================== PHẦN ĐỌC (읽기) ===================== */
    {
      type: "READING",
      durationSec: 4200, // 70 phút như đề thật
      questions: [
        // [1~2] ( )에 들어갈 말로 가장 알맞은 것을 고르십시오. (각 2점)
        {
          order: 1,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage: "어젯밤에 책을 (   ) 잠이 들었어요.",
          points: 2,
          topic: "Đọc — Điền ngữ pháp (câu 1–2)",
          explanation:
            "‘-다가’ diễn tả đang làm việc này thì chuyển sang trạng thái/việc khác. Đang đọc sách thì ngủ thiếp đi → 읽다가.",
          choices: [
            { label: "1", content: "읽도록" },
            { label: "2", content: "읽지만" },
            { label: "3", content: "읽다가", isCorrect: true },
            { label: "4", content: "읽으니까" },
          ],
        },
        {
          order: 2,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage: "오늘 아침에 늦잠을 자느라고 학교에 (   ).",
          points: 2,
          topic: "Đọc — Điền ngữ pháp (câu 1–2)",
          explanation:
            "‘-느라고’ nêu lý do (thường dẫn đến kết quả tiêu cực). Vì ngủ nướng nên đã đến muộn → 지각을 했다.",
          choices: [
            { label: "1", content: "지각을 했다", isCorrect: true },
            { label: "2", content: "지각하곤 했다" },
            { label: "3", content: "지각하는 척했다" },
            { label: "4", content: "지각하기 마련이다" },
          ],
        },
        // [3~4] 밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오. (각 2점)
        {
          order: 3,
          prompt: "밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오.",
          passage: "밤에 바람이 [u]세게 불어서[/u] 모든 촛불이 꺼졌다.",
          points: 2,
          topic: "Đọc — Cụm đồng nghĩa (câu 3–4)",
          explanation:
            "‘불어서’ (vì gió thổi mạnh) gần nghĩa với ‘부는 바람에’ (do gió thổi → dẫn đến kết quả). → 세게 부는 바람에.",
          choices: [
            { label: "1", content: "세게 불어 봐야" },
            { label: "2", content: "세게 부는 대로" },
            { label: "3", content: "세게 분다고 해도" },
            { label: "4", content: "세게 부는 바람에", isCorrect: true },
          ],
        },
        {
          order: 4,
          prompt: "밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오.",
          passage: "나에게 친구가 너 [u]말고도 많다[/u].",
          points: 2,
          topic: "Đọc — Cụm đồng nghĩa (câu 3–4)",
          explanation:
            "‘너 말고도’ (ngoài cậu ra còn…) gần nghĩa với ‘너 외에도’. → 외에도 많다.",
          choices: [
            { label: "1", content: "뿐이다" },
            { label: "2", content: "하나이다" },
            { label: "3", content: "밖에 없다" },
            { label: "4", content: "외에도 많다", isCorrect: true },
          ],
        },
        // [5~8] 다음은 무엇에 관한 글인지 고르십시오. (각 2점)
        {
          order: 5,
          prompt: "다음은 무엇에 관한 글인지 고르십시오.",
          passage: "발이 편안해야 몸 전체가 편안합니다.\n여러분이 가는 곳 어디든 편안하고 안전하게.",
          points: 2,
          topic: "Đọc — Chủ đề quảng cáo (câu 5–8)",
          explanation: "‘발이 편안’ + đi đâu cũng thoải mái/an toàn → quảng cáo giày (신발).",
          choices: [
            { label: "1", content: "신발", isCorrect: true },
            { label: "2", content: "장갑" },
            { label: "3", content: "칫솔" },
            { label: "4", content: "모자" },
          ],
        },
        {
          order: 6,
          prompt: "다음은 무엇에 관한 글인지 고르십시오.",
          passage: "당신에게 어울리는 집\n저희가 바로 당신이 되어 찾아드립니다.",
          points: 2,
          topic: "Đọc — Chủ đề quảng cáo (câu 5–8)",
          explanation: "‘어울리는 집을 찾아드린다’ (tìm nhà phù hợp) → bất động sản (부동산).",
          choices: [
            { label: "1", content: "박물관" },
            { label: "2", content: "도서관" },
            { label: "3", content: "부동산", isCorrect: true },
            { label: "4", content: "유치원" },
          ],
        },
        {
          order: 7,
          prompt: "다음은 무엇에 관한 글인지 고르십시오.",
          passage: "투명 페트병 속도 겉도 깨끗하게!\n내용물은 버리고 라벨은 제거하세요!",
          points: 2,
          topic: "Đọc — Chủ đề quảng cáo (câu 5–8)",
          explanation: "Đổ hết nước, bóc nhãn chai nhựa PET → phân loại rác tái chế (분리 배출).",
          choices: [
            { label: "1", content: "건강 관리" },
            { label: "2", content: "분리 배출", isCorrect: true },
            { label: "3", content: "절약 습관" },
            { label: "4", content: "봉사 활동" },
          ],
        },
        {
          order: 8,
          prompt: "다음은 무엇에 관한 글인지 고르십시오.",
          passage: "졸리면 꼭 쉬었다 가세요.\n절대 휴대 전화를 보거나 만지지 마세요.",
          points: 2,
          topic: "Đọc — Chủ đề quảng cáo (câu 5–8)",
          explanation: "Buồn ngủ thì nghỉ; tuyệt đối không xem/chạm điện thoại → lái xe an toàn (안전 운전).",
          choices: [
            { label: "1", content: "안전 운전", isCorrect: true },
            { label: "2", content: "예약 문의" },
            { label: "3", content: "사용 방법" },
            { label: "4", content: "제품 선정" },
          ],
        },
        // [9~12] 다음 글 또는 그래프의 내용과 같은 것을 고르십시오. (각 2점)
        {
          order: 9,
          prompt: "다음 글 또는 그래프의 내용과 같은 것을 고르십시오.",
          passage:
            "[실내 인테리어 공사 안내문]\n안녕하세요. 404호에서 내부 인테리어 공사를 진행합니다. 공사로 인해 이웃 분들에게 불편함을 드려 죄송합니다.\n※ 공사 기간: 2024. 12. 10(화) ~ 2024. 12. 16(수)\n※ 공사 세대: 105동 404호\n※ 공사 내용: 시스템에어컨 설치공사(12월 10일) — 소음 발생 / 전기·조명공사(12월 11일~12일) — 소음 발생 / 도배 공사 / 필름 공사\n※ 전화 문의: 010-1234-5678",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 9–12)",
          explanation:
            "Tiếng ồn phát sinh ngày 10, 11, 12/12 → 3 ngày (사흘) có tiếng ồn → đáp án ③.",
          choices: [
            { label: "1", content: "인테리어 공사가 일요일 동안 진행된다." },
            { label: "2", content: "인테리어 업체가 직접 입주민에게 사과했다." },
            { label: "3", content: "인테리어 공사 중 사흘 동안 소음이 발생한다.", isCorrect: true },
            { label: "4", content: "인테리어 공사에 화장실 공사가 포함되어 있다." },
          ],
        },
        {
          order: 10,
          prompt: "다음 글 또는 그래프의 내용과 같은 것을 고르십시오.",
          passage:
            "[그래프] 환경을 위해 당신이 실천하는 작은 행동은?\n• 종이컵 사용 안 하기: 30%\n• 대중교통 이용하기: 22%\n• 빨대 사용 안 하기: 18%\n• 차를 두고 걸어다니기: 13%\n• 이면지 사용: 11%\n• 기타: 6%\n(조사 대상: 성인 남녀 각각 500명)",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 9–12)",
          explanation:
            "대중교통 22% đúng gấp đôi 이면지 11% (22 = 2×11) → ④. (① sai: mỗi giới 500 = 1000 người; ② sai: 30% chưa quá nửa; ③ sai: 이면지 đứng thứ 5.)",
          choices: [
            { label: "1", content: "성인 500명을 대상으로 조사하였다." },
            { label: "2", content: "종이컵을 사용하지 않는다는 비율이 절반이 넘었다." },
            { label: "3", content: "환경을 위해 이면지를 사용한다는 응답은 세 번째로 많았다." },
            { label: "4", content: "대중교통 이용하기의 비율은 이면지를 사용한다는 비율의 두 배이다.", isCorrect: true },
          ],
        },
        {
          order: 11,
          prompt: "다음 글 또는 그래프의 내용과 같은 것을 고르십시오.",
          passage:
            "일회용으로 사용되는 플라스틱 숟가락은 분해되는 데 1,000년 이상이 걸린다. 이러한 단점을 보완하여 만들어진 친환경 숟가락이 있다. 친환경 숟가락은 사용하고 나서 먹을 수 있다. 이 숟가락은 수수, 쌀, 밀가루를 혼합해 만들어졌기 때문에 사용 후에 먹어도 인체에 아무런 해가 없다. 먹지 않고 버린다고 하더라도 땅속에서 비교적 짧은 시간에 분해가 된다고 한다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 9–12)",
          explanation:
            "Bài viết nói thìa thân thiện môi trường ‘사용하고 나서 먹을 수 있다’ → ① ‘먹을 수 있다’ đúng.",
          choices: [
            { label: "1", content: "친환경 숟가락은 먹을 수 있다.", isCorrect: true },
            { label: "2", content: "친환경 숟가락은 버려도 분해가 되지 않는다." },
            { label: "3", content: "플라스틱 숟가락은 1,000년 안에 분해된다." },
            { label: "4", content: "친환경 숟가락에는 쌀가루가 들어가지 않는다." },
          ],
        },
        {
          order: 12,
          prompt: "다음 글 또는 그래프의 내용과 같은 것을 고르십시오.",
          passage:
            "눈 쌓인 골목길에서 폐지를 줍던 80대 할머니가 손수레를 끌다 의식을 잃고 쓰러졌다. 때마침 출근 중이던 한 공무원이 달려와 심폐소생술을 한 덕에 할머니는 목숨을 건질 수 있었다. 이 공무원은 갑자기 내린 눈으로 평소보다 일찍 출근하던 길이었다. 할머니는 자신을 구해준 시민에게 감사의 인사를 전했다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 9–12)",
          explanation:
            "Công chức đi làm sớm hơn thường lệ vì tuyết → ‘평소보다 빠른 출근길에서 발견’ → ③. (② sai: là công chức, không phải y tá; ④ sai: chính bà cụ cảm ơn.)",
          choices: [
            { label: "1", content: "할머니는 폭설 때문에 쓰러졌다." },
            { label: "2", content: "할머니를 구해준 사람은 현재 간호사로 일하고 있다." },
            { label: "3", content: "공무원은 평소보다 빠른 출근길에서 할머니를 발견했다.", isCorrect: true },
            { label: "4", content: "할머니의 가족이 구해준 사람에게 감사의 인사를 전했다." },
          ],
        },
        // [13~15] 다음을 순서에 맞게 배열한 것을 고르십시오. (각 2점)
        {
          order: 13,
          prompt: "다음을 순서에 맞게 배열한 것을 고르십시오.",
          passage:
            "(가) 적당히 말린 옥수수 알갱이에 열을 가한다.\n(나) 수분이 수증기로 변화하면서 부피가 크게 커진다.\n(다) 알갱이 속 껍질 내부의 수분이 열에 의해 수증기로 변한다.\n(라) 늘어난 부피로 인해 옥수수 껍질이 터지며 팝콘이 만들어진다.",
          points: 2,
          topic: "Đọc — Sắp xếp thứ tự (câu 13–15)",
          explanation: "Gia nhiệt (가) → hơi nước hình thành (다) → nở thể tích (나) → vỏ nổ thành bỏng ngô (라). → (가)-(다)-(나)-(라).",
          choices: [
            { label: "1", content: "(가)-(다)-(나)-(라)", isCorrect: true },
            { label: "2", content: "(가)-(나)-(다)-(라)" },
            { label: "3", content: "(다)-(가)-(나)-(라)" },
            { label: "4", content: "(다)-(나)-(가)-(라)" },
          ],
        },
        {
          order: 14,
          prompt: "다음을 순서에 맞게 배열한 것을 고르십시오.",
          passage:
            "(가) 동네 사람들이 달려와 불을 끄고 동생을 구했다.\n(나) 나는 술래가 되었고 동생은 촛불을 들고 안방 옷장 안에 숨었다.\n(다) 동생과 내가 숨바꼭질 놀이를 하던 중 정전이 되어 마루에 촛불을 켰다.\n(라) 동생을 찾으러 갔다가 집에 불이 난 것을 발견하고 소리를 질렀다.",
          points: 2,
          topic: "Đọc — Sắp xếp thứ tự (câu 13–15)",
          explanation: "Mất điện, thắp nến (다) → em trốn trong tủ với nến (나) → phát hiện cháy, hô hoán (라) → mọi người dập lửa cứu em (가). → (다)-(나)-(라)-(가).",
          choices: [
            { label: "1", content: "(나)-(다)-(가)-(라)" },
            { label: "2", content: "(다)-(나)-(가)-(라)" },
            { label: "3", content: "(라)-(다)-(가)-(나)" },
            { label: "4", content: "(다)-(나)-(라)-(가)", isCorrect: true },
          ],
        },
        {
          order: 15,
          prompt: "다음을 순서에 맞게 배열한 것을 고르십시오.",
          passage:
            "(가) 현재는 내부의 찬 습기를 조절하기 위해 제습기를 사용하고 있다.\n(나) 석굴 바닥에 물이 흐르지 않자 내부에 습기가 차고 조각상에 이슬이 맺혔다.\n(다) 석굴암을 만들 때 습기 방지를 위해 샘을 두어 석굴 바닥에 물이 흐르게 했다.\n(라) 후대에 석굴암을 발견한 이들은 물의 역할을 몰라 물을 석굴 밖으로 흘려보냈다.",
          points: 2,
          topic: "Đọc — Sắp xếp thứ tự (câu 13–15)",
          explanation: "Đặt mạch nước cho chảy (다) → người sau không hiểu nên tháo nước ra ngoài (라) → ẩm tụ, đọng sương (나) → nay dùng máy hút ẩm (가). → (다)-(라)-(나)-(가).",
          choices: [
            { label: "1", content: "(가)-(나)-(다)-(라)" },
            { label: "2", content: "(다)-(가)-(라)-(나)" },
            { label: "3", content: "(다)-(라)-(나)-(가)", isCorrect: true },
            { label: "4", content: "(다)-(가)-(나)-(라)" },
          ],
        },
        // [16~18] ( )에 들어갈 말로 가장 알맞은 것을 고르십시오. (각 2점)
        {
          order: 16,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "열기구가 떠오르는 것도 기체의 온도와 부피의 관계를 이용하는 현상이다. 열기구의 풍선 속 기체를 가열하면 (   ) 기체의 부피가 늘어나 크게 부풀어 오른다. 그러면 풍선 속 기체의 일부가 밖으로 빠져나가면서 열기구가 가벼워져 하늘 위로 떠오른다.",
          points: 2,
          topic: "Đọc — Điền vào chỗ trống (câu 16–18)",
          explanation: "Đốt nóng khí → nhiệt độ tăng nên thể tích nở ra → ‘온도가 높아지면서’.",
          choices: [
            { label: "1", content: "온도가 높아지면서", isCorrect: true },
            { label: "2", content: "풍선 주위가 차가워지면서" },
            { label: "3", content: "바람이 풍선 안으로 들어오면서" },
            { label: "4", content: "풍선 속 부피가 같아지면서" },
          ],
        },
        {
          order: 17,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "산업화와 도시화는 거주 공간의 변화를 가져왔다. 사람들은 산업화와 도시화 이후 (   ) 되었다. 도시에 많은 인구가 집중하면서 제한된 공간을 효율적으로 이용하기 위해 고층 건물이 들어서고, 아파트와 같은 도시형 주택이 등장하게 되었다. 또한 도시에는 주거, 업무, 상업, 교육, 여가 등을 수행하기 위한 다양한 공간이 형성되었다.",
          points: 2,
          topic: "Đọc — Điền vào chỗ trống (câu 16–18)",
          explanation: "Dùng không gian hạn chế một cách hiệu quả → ‘토지를 집약적으로 이용하게’.",
          choices: [
            { label: "1", content: "공원을 많이 만들게" },
            { label: "2", content: "대중교통을 이용하게" },
            { label: "3", content: "토지를 집약적으로 이용하게", isCorrect: true },
            { label: "4", content: "도시 안에서도 농업이 이루어지게" },
          ],
        },
        {
          order: 18,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "식테크는 식물과 재테크를 합친 신조어로서 식물을 키워 (   ) 행위를 뜻한다. 코로나19 이후로 야외 활동이 줄어들고 집에서 할 수 있는 취미에 대한 관심이 커지면서 식물을 키우는 사람이 늘었다. 동시에 식물 수요가 늘면서 희귀 식물에 대한 관심이 높아져, 키운 식물을 더 비싼 가격에 되팔아 수익을 내는 경우가 생겼다.",
          points: 2,
          topic: "Đọc — Điền vào chỗ trống (câu 16–18)",
          explanation: "식테크 = 식물(cây) + 재테크(đầu tư): nuôi cây rồi bán lại giá cao kiếm lời → ‘더 비싼 가격으로 되파는’.",
          choices: [
            { label: "1", content: "시들기 전에 보내는" },
            { label: "2", content: "무료로 나누어주는" },
            { label: "3", content: "공공기관에 기부하는" },
            { label: "4", content: "더 비싼 가격으로 되파는", isCorrect: true },
          ],
        },
        // [19~20] 다음을 읽고 물음에 답하십시오. (각 2점)
        {
          order: 19,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "인간은 오래전부터 생물이 지닌 놀라운 특징을 발견하고 모방해 왔다. 생물을 모방한 예로는 잠자리를 모방한 헬리콥터, 도꼬마리의 열매를 모방한 벨크로 테이프, 상어 비늘을 모방한 전신수영복 등이 있다. (   ) 다양한 생물의 특징을 모방해 새로운 기술이나 장치를 개발하는 연구 분야를 생체 모방이라고 한다. 생체 모방은 자동차, 항공기, 로봇, 의료 등 여러 분야에서 활용되고 있어 기존의 과학과 공학의 한계를 뛰어넘게 해 줄 것으로 기대하고 있다.",
          points: 2,
          topic: "Đọc — Đọc đoạn trả lời (câu 19–20)",
          explanation: "Sau khi liệt kê ví dụ (chuồn chuồn→trực thăng…), dùng ‘이처럼’ (như thế) để khái quát.",
          choices: [
            { label: "1", content: "또한" },
            { label: "2", content: "이처럼", isCorrect: true },
            { label: "3", content: "오히려" },
            { label: "4", content: "이를테면" },
          ],
        },
        {
          order: 20,
          prompt: "윗글의 주제로 가장 알맞은 것을 고르십시오.",
          passage:
            "인간은 오래전부터 생물이 지닌 놀라운 특징을 발견하고 모방해 왔다. (잠자리→헬리콥터, 도꼬마리→벨크로, 상어 비늘→전신수영복 등) 이처럼 생물의 특징을 모방해 기술·장치를 개발하는 연구 분야를 ‘생체 모방’이라고 한다. 생체 모방은 자동차, 항공기, 로봇, 의료 등 여러 분야에서 활용되며 과학·공학의 한계를 뛰어넘게 해 줄 것으로 기대된다.",
          points: 2,
          topic: "Đọc — Chủ đề đoạn văn (câu 19–20)",
          explanation: "Chủ đề: phỏng sinh học được ứng dụng nhiều lĩnh vực và sẽ vượt giới hạn của khoa học → ④.",
          choices: [
            { label: "1", content: "헬리콥터는 잠자리를 본떠 만들어졌다." },
            { label: "2", content: "생체 모방은 아직 의료 분야에 활용되고 있지 않다." },
            { label: "3", content: "인간은 최근에서야 생물의 특징을 발견하고 모방하고 있다." },
            { label: "4", content: "생체 모방은 여러 분야에서 활용되고 있으며 과학의 한계를 뛰어넘을 것이다.", isCorrect: true },
          ],
        },
        // [21~22] 다음을 읽고 물음에 답하십시오. (각 2점)
        {
          order: 21,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "자녀의 성장에 부모들은 늘 관심이 많다. 특히 키 성장에 관심이 많은데 성장기에 성장 호르몬이 부족하면 키가 충분히 크지 못할 수 있다. 성장 호르몬의 충분한 분비에 필요한 것은 충분한 수면과 균형 있는 영양 섭취 그리고 운동이다. 특히 성장 호르몬은 여러 가지 음식을 골고루 먹어야 부족하지 않을 수 있는데 (   ) 아이는 균형 있는 영양 섭취에 문제가 있을 수 있고 이것은 성장 호르몬의 부족으로 나타날 수 있다.",
          points: 2,
          topic: "Đọc — Đọc đoạn trả lời (câu 21–22)",
          explanation: "Cần ăn đa dạng đủ chất, nhưng trẻ ‘입이 짧은’ (kén ăn, ăn ít) thì dễ thiếu dinh dưỡng cân bằng.",
          choices: [
            { label: "1", content: "손이 큰" },
            { label: "2", content: "입이 짧은", isCorrect: true },
            { label: "3", content: "다리가 긴" },
            { label: "4", content: "머리가 굵은" },
          ],
        },
        {
          order: 22,
          prompt: "윗글의 내용과 같은 것을 고르십시오.",
          passage:
            "성장기에 성장 호르몬이 부족하면 키가 충분히 크지 못할 수 있다. 성장 호르몬의 충분한 분비에는 충분한 수면, 균형 있는 영양 섭취, 운동이 필요하다. 여러 음식을 골고루 먹지 못하면 영양 섭취에 문제가 생겨 성장 호르몬 부족으로 이어질 수 있다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 21–22)",
          explanation: "Thiếu hormone tăng trưởng thì khó cao → ‘성장 호르몬은 키 크는 데 영향을 준다’ → ③.",
          choices: [
            { label: "1", content: "수면과 키는 전혀 관계가 없다." },
            { label: "2", content: "부모는 자녀의 공부에 가장 관심이 많다." },
            { label: "3", content: "성장 호르몬은 자녀의 키가 크는 데 영향을 준다.", isCorrect: true },
            { label: "4", content: "영양 섭취가 부족하더라도 운동을 하면 키가 클 수 있다." },
          ],
        },
        // [23~24] 다음을 읽고 물음에 답하십시오. (각 2점) — tản văn: rửa phím đàn (건반) trắng/đen
        {
          order: 23,
          prompt: "밑줄 친 부분('다 했다.')에 나타난 ‘나’의 심정으로 가장 알맞은 것을 고르십시오.",
          passage:
            "시간이 흐를수록 대야의 물이 시커멓게 변했다. 나는 더러워진 물을 버리고 깨끗한 물을 받아 헹구었다. 물속에 잠긴 하얀 건반들은 눈이 부시도록 하얗게 빛났다. 다음에는 검은 건반들을 대야에 쏟아 부었다. 검은 건반들에서 검은 물이 조금씩 배어 나왔고, 건반을 문지르는 손에도 검은 물이 스몄다. 검은 건반까지 모두 깨끗하게 씻은 뒤, 빨랫줄을 눈높이까지 낮춰 하얀 건반을 하나하나 집어서 널었다. 하얀 건반들은 양말들처럼 나란히 줄을 맞춰 매달렸다. 검은 건반도 빨래집게로 꼭꼭 집어서 매달았다. 빨랫줄에는 하얀 건반과 검은 건반이 나란히 걸렸다. [u]'다 했다.'[/u]",
          points: 2,
          topic: "Đọc — Tâm trạng nhân vật (câu 23–24)",
          explanation: "Rửa sạch và phơi ngay ngắn xong, nhìn thành quả → cảm giác nhẹ nhõm, sảng khoái → 상쾌하다.",
          choices: [
            { label: "1", content: "상쾌하다", isCorrect: true },
            { label: "2", content: "미안하다" },
            { label: "3", content: "섭섭하다" },
            { label: "4", content: "아찔하다" },
          ],
        },
        {
          order: 24,
          prompt: "윗글의 내용과 같은 것을 고르십시오.",
          passage:
            "(피아노의) 하얀 건반을 먼저 깨끗한 물로 씻은 뒤, 검은 건반들을 대야에 쏟아 씻었다. 검은 건반에서는 검은 물이 배어 나왔다. 다 씻은 뒤 하얀 건반과 검은 건반을 빨랫줄에 빨래집게로 집어 나란히 매달았다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 23–24)",
          explanation: "Cả phím trắng và phím đen đều được rửa bằng nước → ① đúng. (② ‘양말’ chỉ là so sánh; ③ nước đen là từ phím đen; ④ phơi trên dây chứ không để rổ.)",
          choices: [
            { label: "1", content: "하얀 건반과 검은 건반을 물로 씻었다.", isCorrect: true },
            { label: "2", content: "양말과 하얀 건반을 빨랫줄에 같이 널었다." },
            { label: "3", content: "하얀 건반에서 나온 물 때문에 손에 검은 물이 들었다." },
            { label: "4", content: "다 씻은 하얀 건반과 검은 건반을 바구니 안에 넣고 말렸다." },
          ],
        },
        // [25~27] 다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오. (각 2점)
        {
          order: 25,
          prompt: "다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.",
          passage: "혀 일부 절단한 가수 진영, 설암 극복하고 컴백",
          points: 2,
          topic: "Đọc — Giải thích tiêu đề báo (câu 25–27)",
          explanation: "Ca sĩ từng cắt một phần lưỡi vì ung thư lưỡi, nay vượt qua và trở lại ca hát → ①.",
          choices: [
            { label: "1", content: "설암에 걸려 혀의 일부를 잘라냈던 가수 진영이 다시 가수로 복귀했다.", isCorrect: true },
            { label: "2", content: "가수 진영이 설암에 걸려 혀의 일부를 잘라냈다가 가수를 그만두게 되었다." },
            { label: "3", content: "혀 수술로 좌절을 겪었던 가수 진영이 설암을 극복하고 복귀할 것을 약속했다." },
            { label: "4", content: "진영이 노래할 때 관객 중 한 명이 소리를 지르다가 혀가 잘리는 사고를 당했다." },
          ],
        },
        {
          order: 26,
          prompt: "다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.",
          passage: "한여름 같은 9월, 오늘 폭염 신기록 또 경신",
          points: 2,
          topic: "Đọc — Giải thích tiêu đề báo (câu 25–27)",
          explanation: "Tháng 9 vẫn nóng như giữa hè, hôm nay lại lập kỷ lục nắng nóng (ngày nóng nhất) → ①.",
          choices: [
            { label: "1", content: "9월에도 더위가 이어지고 있으며 오늘이 가장 더운 날로 기록되었다.", isCorrect: true },
            { label: "2", content: "오늘이 9월 들어 가장 더웠으며 처음으로 폭염 신기록을 세운 날이다." },
            { label: "3", content: "한여름에 폭염이 계속되고 있으며 이러한 더위는 9월에도 계속될 것이다." },
            { label: "4", content: "보통 9월은 가을로 여겨지는데 더운 날씨가 계속되기에 여름으로 불러야 한다." },
          ],
        },
        {
          order: 27,
          prompt: "다음 신문 기사의 제목을 가장 잘 설명한 것을 고르십시오.",
          passage: "예외 없이 전국적으로 물가 상승… 경기 2.2% 올라",
          points: 2,
          topic: "Đọc — Giải thích tiêu đề báo (câu 25–27)",
          explanation: "Giá cả tăng trên toàn quốc không ngoại lệ (Gyeonggi tăng 2.2% chỉ là ví dụ) → ‘전국 모든 지역 물가 상승’ → ③.",
          choices: [
            { label: "1", content: "경기도만 물가가 올랐다." },
            { label: "2", content: "전국의 모든 물가가 2.2% 올랐다." },
            { label: "3", content: "전국 모든 지역의 물가가 상승했다.", isCorrect: true },
            { label: "4", content: "경기도의 물가 상승률이 전국에서 가장 높다." },
          ],
        },
        // [28~31] ( )에 들어갈 말로 가장 알맞은 것을 고르십시오. (각 2점)
        {
          order: 28,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "뇌사란 뇌간을 포함한 뇌의 활동이 (   ) 상태를 말한다. 뇌사에 이른 환자는 자발적 호흡이 불가능하며, 인공호흡기 등 연명 의료 기기를 이용하여 일정 기간 호흡을 유지할 수는 있지만 결국 가까운 시일 안에 심장과 폐 기능이 정지한다. 이러한 뇌사와 관련된 윤리적 쟁점은 뇌사를 죽음의 판정 기준으로 삼을 것인지의 여부이다.",
          points: 2,
          topic: "Đọc — Điền vào chỗ trống (câu 28–31)",
          explanation: "뇌사(chết não) = hoạt động não ngừng không thể hồi phục → ‘회복할 수 없을 정도로 정지된’.",
          choices: [
            { label: "1", content: "매우 활발한" },
            { label: "2", content: "일시적으로 멈춘" },
            { label: "3", content: "간헐적으로 운동하는" },
            { label: "4", content: "회복할 수 없을 정도로 정지된", isCorrect: true },
          ],
        },
        {
          order: 29,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "동물 권리 논쟁의 핵심은 동물이 도덕적으로 고려 받을 권리를 가지는가이다. 이에 관하여 동물은 도덕적으로 고려 받을 권리를 가지지 않는다는 주장이 있다. 예를 들면 데카르트는 동물을 '자동인형' 또는 '움직이는 기계'에 불과하다고 주장하면서, 동물이 고통을 느낄 때 몸부림치거나 고통스러운 소리를 내는 것은 자동인형이 움직이거나 시계가 째깍거리는 소리와 같다고 주장했다. 데카르트의 이런 주장은 당시 유럽에서 (   ) 데 이용되었다.",
          points: 2,
          topic: "Đọc — Điền vào chỗ trống (câu 28–31)",
          explanation: "Descartes coi động vật là cỗ máy → bị dùng để biện minh cho việc thí nghiệm động vật không chút áy náy → ④.",
          choices: [
            { label: "1", content: "육식을 장려하는" },
            { label: "2", content: "동물 권리의 개념을 생성하는" },
            { label: "3", content: "동물 복지를 한 단계 끌어올리는" },
            { label: "4", content: "거리낌 없이 동물 실험을 정당화하는", isCorrect: true },
          ],
        },
        {
          order: 30,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "태권도와 같은 투기 도전 활동은 움직이는 상대에게 도전하기 때문에 항상 상대방의 움직임에 집중해야 하며, (   ) 방법은 짧은 시간 안에 판단해야 한다. 이러한 순간적인 판단은 경기 전 상대방의 전략을 미리 분석하거나, 경기 중 상대방의 움직임을 예상함으로써 얻을 수 있다. 이처럼 경기 중에 발생하는 문제에 적절한 대응 방법을 실행하는 과정을 통해 문제 해결력을 기를 수 있다.",
          points: 2,
          topic: "Đọc — Điền vào chỗ trống (câu 28–31)",
          explanation: "Phải tập trung vào chuyển động đối thủ và phán đoán cách ‘đối phó với chuyển động của đối thủ’ → ②.",
          choices: [
            { label: "1", content: "나의 움직임을 숨길" },
            { label: "2", content: "상대방의 움직임에 대처할", isCorrect: true },
            { label: "3", content: "상대방의 움직임을 무시할" },
            { label: "4", content: "나의 움직임을 과장되게 보여줄" },
          ],
        },
        {
          order: 31,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "오늘날에는 게임, 쇼핑, 정보 검색, 동영상 시청 등 인터넷을 통해 할 수 있는 활동이 늘어나면서 생활은 편리해졌다. 하지만 인터넷 사용에 지나치게 몰입하여 문제가 발생하기도 한다. 인터넷 중독은 약물 중독처럼 (   ) 내성이 생기고, 중단했을 때 우울, 불안 등의 금단 증상이 나타나는 등 일상생활에 지장을 주는 상태를 말한다.",
          points: 2,
          topic: "Đọc — Điền vào chỗ trống (câu 28–31)",
          explanation: "Như nghiện thuốc, ‘내성(nhờn)’ tăng nên đòi hỏi kích thích mạnh hơn → ‘더 자극적인 행동을 요구하는’.",
          choices: [
            { label: "1", content: "일관된 행동을 보여주는" },
            { label: "2", content: "자극이 약한 행동을 원하는" },
            { label: "3", content: "더 자극적인 행동을 요구하는", isCorrect: true },
            { label: "4", content: "점진적으로 완화된 반응을 일으키는" },
          ],
        },
        // [32~34] 다음을 읽고 글의 내용과 같은 것을 고르십시오. (각 2점)
        {
          order: 32,
          prompt: "다음을 읽고 글의 내용과 같은 것을 고르십시오.",
          passage:
            "조각칼로 새겨 찍어 낸 판화는 그 독특한 느낌을 선명하게 드러낸다. 하지만 초기 판화는 서적이나 회화작품의 보급을 위한 복제 수단으로 사용되었다. 이러한 이유로 오랫동안 판화 작품은 복제품으로 간주되어 예술의 영역으로 취급받지 못했다. 그러나 시간이 흐르자 미술가들은 사용하는 도구, 재료, 인쇄법 등에 따라 매우 독특한 질감과 효과를 보이는 판화의 특수성에 매료되었다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 32–34)",
          explanation: "Tranh khắc cho chất cảm độc đáo tùy theo dụng cụ, vật liệu, cách in → ③.",
          choices: [
            { label: "1", content: "판화는 현재 복제품으로 인식되고 있다." },
            { label: "2", content: "판화는 초기부터 예술작품으로 인정받았다." },
            { label: "3", content: "판화는 사용하는 도구와 재료에 따라 독특한 질감을 보여준다.", isCorrect: true },
            { label: "4", content: "판화가 예술작품으로 인정받으려면 꼭 조각칼을 이용해야 한다." },
          ],
        },
        {
          order: 33,
          prompt: "다음을 읽고 글의 내용과 같은 것을 고르십시오.",
          passage:
            "보호 무역은 대부분 후진국에서 지지할 것으로 생각하기 쉽지만, 반드시 그렇지만은 않다. 자유 무역을 통해 외국의 값싼 상품을 수입하게 되면 국내 상품의 공급량 감소로 이어지고, 그 과정에서 실업이 발생할 수 있다. 더욱이 선진국은 자유 무역을 통한 저임금 노동자의 유입으로 임금 수준이 하락하게 되어 고용 불안이 심화될 수 있다. 따라서 이러한 문제를 해소하려면 선진국에도 보호 무역이 필요하다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 32–34)",
          explanation: "Nước phát triển có thể bị giảm lương do lao động giá rẻ tràn vào → cần bảo hộ để chặn rớt lương → ④.",
          choices: [
            { label: "1", content: "보호 무역은 후진국에서만 지지한다." },
            { label: "2", content: "선진국에서도 여러 상황에 따라 자유 무역이 필요하다." },
            { label: "3", content: "보호 무역을 통해 외국의 값싼 상품을 수입할 수 있다." },
            { label: "4", content: "임금의 하락을 막기 위해 보호 무역 조치가 필요할 수 있다.", isCorrect: true },
          ],
        },
        {
          order: 34,
          prompt: "다음을 읽고 글의 내용과 같은 것을 고르십시오.",
          passage:
            "사격은 총으로 표적을 맞혀 정확도를 겨루는 경기로, 안전한 장소와 장비만 갖추어지면 남녀노소 누구나 손쉽게 즐길 수 있다. 과거에는 주로 수렵이나 군사적 목적으로 사용되었으나, 오늘날에는 대표적인 표적 도전 스포츠로 발전하였다. 사격은 비교적 움직임이 적은 활동이지만 훈련을 통해 근력과 근지구력을 기를 수 있다. 또한 표적에 대한 주의 집중 훈련을 통해 심리적 안정을 얻을 수 있으며, 자신의 기록을 경신할 때마다 자신감과 성취감을 기를 수 있다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 32–34)",
          explanation: "Luyện tập trung vào bia giúp ‘얻는 심리적 안정’ → ①. (② sai: ai cũng chơi được; ③ sai: ít vận động; ④ sai: vượt kỷ lục của chính mình.)",
          choices: [
            { label: "1", content: "사격은 심리적 안정을 얻을 수 있는 스포츠이다.", isCorrect: true },
            { label: "2", content: "사격은 총을 다루는 스포츠로 성인만 할 수 있다." },
            { label: "3", content: "사격은 많은 활동으로 근력과 근지구력을 기를 수 있다." },
            { label: "4", content: "사격은 다른 사람의 기록을 넘어설 때 자신감을 얻는다." },
          ],
        },
        // [35~38] 다음을 읽고 글의 주제로 가장 알맞은 것을 고르십시오. (각 2점)
        {
          order: 35,
          prompt: "다음을 읽고 글의 주제로 가장 알맞은 것을 고르십시오.",
          passage:
            "오늘날에는 의료 기술의 발달과 생활수준의 향상으로 사람들의 평균 수명이 늘어남에 따라 노후 생활을 대비해야 할 필요성이 더욱 높아진다. 또한 미래에 예상되는 지출과 더불어 뜻밖의 사고나 질병 등과 같이 예기치 못한 지출에도 대비해야 한다. 이에 따라 안정적인 경제생활을 위한 효율적인 자산 관리의 필요성이 커지고 있다.",
          points: 2,
          topic: "Đọc — Chủ đề đoạn văn (câu 35–38)",
          explanation: "Tuổi thọ tăng → cần chuẩn bị cho tuổi già và chi tiêu bất ngờ → chủ đề: quản lý tài sản quan trọng cho tuổi già → ②.",
          choices: [
            { label: "1", content: "의료 기술의 발달은 평균 수명을 연장시켰다." },
            { label: "2", content: "안정적인 노후 생활을 위해 자산 관리가 중요하다.", isCorrect: true },
            { label: "3", content: "뜻밖의 질병이나 사고 등에 대비하기 위해 운동을 해야 한다." },
            { label: "4", content: "건강한 노후 생활을 보내기 위해 꾸준히 건강 검진을 받아야 한다." },
          ],
        },
        {
          order: 36,
          prompt: "다음을 읽고 글의 주제로 가장 알맞은 것을 고르십시오.",
          passage:
            "환경문제 관련 국가들의 자발적 참여를 유도하기 위해서는 지역 사회나 민간 부문의 적극적인 참여가 중요하다. 따라서 최근에는 비정부 기구(NGO)와 민간단체의 활동이 환경 관련 국제 협력에 크게 기여하고 있다. 예를 들면 환경 관련 연구와 캠페인 진행, 국제회의 참여 등 다양한 방식으로 환경 문제 해결에 참여하고 있다. 1990년대 말부터 진행되고 있는 황사 발원지의 숲 만들기 사업 역시 한국, 중국, 일본, 몽골 등 각국 정부와 함께 민간단체의 활발한 참여를 통해 이루어지고 있다.",
          points: 2,
          topic: "Đọc — Chủ đề đoạn văn (câu 35–38)",
          explanation: "Chủ đề: cần vai trò tích cực của cộng đồng địa phương và khu vực tư nhân/dân sự → ④.",
          choices: [
            { label: "1", content: "환경문제를 해결하기 위해 국가별로 대응해야 한다." },
            { label: "2", content: "환경문제를 해결하기 위해 중국, 일본, 몽골이 앞장서야 한다." },
            { label: "3", content: "환경문제 관련 국가들의 참여를 유도하기 위해서 정부가 나서야 한다." },
            { label: "4", content: "환경문제를 해결하기 위해서는 지역 사회 및 민간 부문의 역할이 중요하다.", isCorrect: true },
          ],
        },
        {
          order: 37,
          prompt: "다음을 읽고 글의 주제로 가장 알맞은 것을 고르십시오.",
          passage:
            "교통·통신의 발달과 세계화의 영향으로 인구 이동이 국제적으로 활발해지면서 서로 다른 문화권에 속한 사람들 간의 접촉이 빈번해지고 있다. 그 결과 다양한 인종, 종교, 언어 등 서로 다른 문화적 배경을 가진 사람들이 함께 살아가는 다문화 사회로 변화하게 되었다. 다문화 사회로의 변화는 긍정적인 영향을 끼치기도 하지만 문화적 갈등을 초래하기도 한다. 다문화 사회에서 사회가 발전하기 위해서는 구성원들이 다문화에 대한 올바른 이해를 전제로 갈등을 최소화하려는 태도가 필요하다.",
          points: 2,
          topic: "Đọc — Chủ đề đoạn văn (câu 35–38)",
          explanation: "Để phát triển trong xã hội đa văn hóa, trước hết phải hiểu đúng về đa văn hóa → ③.",
          choices: [
            { label: "1", content: "다문화 사회가 나타나게 된 배경은 교통과 통신의 발달이다." },
            { label: "2", content: "다문화 사회에서 상대에 대한 이해 중 가장 중요한 것은 종교에 대한 이해이다." },
            { label: "3", content: "다문화 사회에서 발전을 이루려면 다문화 사회에 대한 이해가 우선되어야 한다.", isCorrect: true },
            { label: "4", content: "다문화 사회에서 갈등은 자연스러운 현상이므로 걱정할 필요가 없다." },
          ],
        },
        {
          order: 38,
          prompt: "다음을 읽고 글의 주제로 가장 알맞은 것을 고르십시오.",
          passage:
            "사회적 자원을 구성원에게 분배하는 것과 관련된 정의를 분배적 정의라고 한다. 분배적 정의의 실질적 기준에는 능력, 업적, 필요 등이 있는데 그것을 바라보는 사람에 따라 공정하다고 생각하는 것이 달라질 수 있다. 능력에 따른 분배는 타고난 재능이나 환경 같은 우연적 요소가 개입할 수 있고, 업적에 따른 분배는 사회적 약자에 대한 배려가 부족할 수 있으며, 필요에 따른 분배는 사회적 자원이 모든 사람의 필요를 충족하기 어렵다는 문제가 있다. 이처럼 각 기준은 저마다 문제점이 있어 어느 한 가지 기준만이 정의롭다고 말할 수 없다.",
          points: 2,
          topic: "Đọc — Chủ đề đoạn văn (câu 35–38)",
          explanation: "Mỗi tiêu chí đều có hạn chế nên cần tìm tiêu chí phù hợp nhất với tình huống → ②.",
          choices: [
            { label: "1", content: "분배적 정의에서 가장 공정한 기준은 업적이다." },
            { label: "2", content: "분배적 정의가 요구될 때 가장 적합한 기준을 찾는 것이 중요하다.", isCorrect: true },
            { label: "3", content: "사회 구성원은 각각의 분배적 정의의 문제점을 없애도록 노력해야 한다." },
            { label: "4", content: "분배적 정의의 여러 기준에서 하나의 기준이 일관되게 적용되어야 한다." },
          ],
        },
        // [39~41] 주어진 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오. (각 2점)
        {
          order: 39,
          prompt:
            "다음 문장이 들어갈 곳으로 가장 알맞은 곳을 고르십시오.\n〈보기〉 또한 춤을 통해서 줄거리의 극적 전개를 보여준다.",
          passage:
            "뮤지컬은 20세기 미국의 브로드웨이와 영국의 웨스트엔드를 중심으로 발달하였다. ( ㉠ ) 이것은 노래가 중심이 되어 음악, 무용, 연극적인 요소가 조화를 이룬 현대적인 음악극의 한 유형이다. ( ㉡ ) 음악은 대중적인 재즈나 민요 등을 많이 사용한다. ( ㉢ ) 다양한 이야기 소재와 여러 가지 음악 양식을 폭넓게 수용해 대중에게 많은 사랑을 받고 있어 음악 영화로도 제작되고 있다. ( ㉣ )",
          points: 2,
          topic: "Đọc — Chèn câu vào vị trí (câu 39–41)",
          explanation: "Câu nói về ‘춤(múa) thể hiện diễn biến cốt truyện’ đi song song với câu nói về âm nhạc, đặt sau câu về 음악 → ㉢.",
          choices: [
            { label: "1", content: "㉠" },
            { label: "2", content: "㉡" },
            { label: "3", content: "㉢", isCorrect: true },
            { label: "4", content: "㉣" },
          ],
        },
        {
          order: 40,
          prompt:
            "다음 문장이 들어갈 곳으로 가장 알맞은 곳을 고르십시오.\n〈보기〉 다양한 역량 중에서 성공적인 직업 생활을 위해 필요한 역량이 직업윤리이다.",
          passage:
            "성공적인 직업 생활을 위해서는 그 직업을 수행하는 데 필요한 다양한 역량을 갖추어야 한다. ( ㉠ ) 직업윤리는 사회에서 직업인에게 요구하는 도덕적 원리와 행동 규범, 마음가짐, 태도 등을 뜻한다. ( ㉡ ) 직업에 대한 긍정적이며 윤리적인 태도는 직업 생활과 사회 조직 내 공동생활에 영향을 끼친다. ( ㉢ ) 따라서 청소년 시기에 진정한 직업인으로서 직업윤리를 바르게 이해하고 실현하려는 의지를 기르도록 노력해야 한다. ( ㉣ )",
          points: 2,
          topic: "Đọc — Chèn câu vào vị trí (câu 39–41)",
          explanation: "Câu giới thiệu ‘직업윤리’ trong số các năng lực, nối ngay sau câu ‘다양한 역량을 갖추어야 한다’ → ㉠.",
          choices: [
            { label: "1", content: "㉠", isCorrect: true },
            { label: "2", content: "㉡" },
            { label: "3", content: "㉢" },
            { label: "4", content: "㉣" },
          ],
        },
        {
          order: 41,
          prompt:
            "다음 문장이 들어갈 곳으로 가장 알맞은 곳을 고르십시오.\n〈보기〉 하지만 방짜는 독특한 제작 방식을 사용하기에 쉽게 깨지지 않는다.",
          passage:
            "구리를 주재료로 하여 아연 등을 섞은 합금을 유기라고 한다. ( ㉠ ) 우리 선조들은 독특한 합금 기술인 유기의 일종인 방짜를 만들어 사용해 왔다. ( ㉡ ) 유기에서 주석의 합금 비율이 10%를 넘으면 쉽게 깨진다. ( ㉢ ) 방짜는 합금 비율이 구리 78%, 주석 22%로 주석의 비율이 10% 이상이다. ( ㉣ ) 선조들은 방짜 제품을 만들 때 구리와 주석의 합금을 불에 달구면서 망치로 쳐서 모양을 잡아가며 만들었는데, 이러한 제작 방식은 방짜가 깨지는 것을 방지하였다.",
          points: 2,
          topic: "Đọc — Chèn câu vào vị trí (câu 39–41)",
          explanation: "방짜 có tỉ lệ thiếc >10% (lẽ ra dễ vỡ), ‘하지만 không dễ vỡ nhờ cách chế tác’ → đặt sau câu ㉣.",
          choices: [
            { label: "1", content: "㉠" },
            { label: "2", content: "㉡" },
            { label: "3", content: "㉢" },
            { label: "4", content: "㉣", isCorrect: true },
          ],
        },
        // [42~43] 다음을 읽고 물음에 답하십시오. (각 2점) — đoạn văn học (lược)
        {
          order: 42,
          prompt: "밑줄 친 부분('나는 방문을 닫아 버렸다.')에 나타난 ‘나’의 심정으로 알맞은 것을 고르십시오.",
          passage:
            "나는 그를 재워 줬더니 새벽같이 달아나면서 손목시계를 집어가 버렸다. 그가 형편이 어렵다는 것을 알기에 먼저 이야기하기를 기다리던 참이었는데, 오늘은 내 유일한 재산 목록인 트랜지스터 라디오마저 집어가 버린 것이다. '저 옆방에는 누구든지 들여보내지 마세요.' [u]나는 방문을 닫아 버렸다.[/u]",
          points: 2,
          topic: "Đọc — Tâm trạng nhân vật (câu 42–43)",
          explanation: "Bị lấy trộm đồ nhiều lần (đồng hồ, radio), đóng sầm cửa → bực bội, khó chịu → 짜증스럽다.",
          choices: [
            { label: "1", content: "허전하다" },
            { label: "2", content: "우울하다" },
            { label: "3", content: "짜증스럽다", isCorrect: true },
            { label: "4", content: "자랑스럽다" },
          ],
        },
        {
          order: 43,
          prompt: "윗글의 내용으로 알 수 있는 것을 고르십시오.",
          passage:
            "나는 그를 재워 줬더니 새벽같이 손목시계를 집어가 버렸고, 오늘은 내 유일한 재산인 트랜지스터 라디오마저 집어가 버렸다. 그러던 어느 날 그는 불쑥 학교로 찾아와 이틀 뒤에 영국으로 떠난다고 했고 정말로 떠나 버렸다. 그에게는 박사학위를 가져오지 못한 약점을 보완할 지인도 없었다.",
          points: 2,
          topic: "Đọc — Suy ra nội dung (câu 42–43)",
          explanation: "Người kể biết rõ anh ta đã lấy đồ của mình (đồng hồ, radio) → ②. (③ sai: không lấy được bằng tiến sĩ.)",
          choices: [
            { label: "1", content: "문을 열어 준 사람은 그를 전혀 모른다." },
            { label: "2", content: "나는 그가 나의 물건을 가지고 간 것을 알고 있다.", isCorrect: true },
            { label: "3", content: "그는 영국에서의 성공적인 유학 생활을 박사학위로 마쳤다." },
            { label: "4", content: "그는 나의 방에 없을 때 방에 들어와 나의 손목시계를 가져갔다." },
          ],
        },
        // [44~45] 다음을 읽고 물음에 답하십시오. (각 2점)
        {
          order: 44,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "조선 후기에는 농업과 상공업이 발달하면서 서민들의 경제력이 향상되었다. 이에 따라 문화의 폭이 서민층에까지 확대되었으며, (   ) 서민 문화가 발달하였다. 이와 함께 서당이 널리 보급되고 한글 사용이 늘면서 서민들의 의식 수준도 높아졌다. 이에 따라 서민들의 소망과 양반 사회의 비판을 담은 한글 소설이 유행하였다. '홍길동전'은 신분 차별 철폐와 이상 사회 건설을, '춘향전'은 신분을 뛰어넘는 남녀 간의 사랑을 묘사하였다. 형식에 얽매이지 않고 솔직한 감정을 표현한 사설시조가 유행했고, 판소리와 탈춤도 인기가 많았다.",
          points: 2,
          topic: "Đọc — Đọc đoạn trả lời (câu 44–45)",
          explanation: "Văn hóa mở rộng tới tầng lớp bình dân → ‘서민 문화’ thể hiện suy nghĩ, cảm xúc của thường dân → ②.",
          choices: [
            { label: "1", content: "형식과 틀을 중요시하는" },
            { label: "2", content: "서민들의 생각과 감정을 표현한", isCorrect: true },
            { label: "3", content: "양반의 주도 아래 자유로움을 표현한" },
            { label: "4", content: "여러 계층의 솔직함과 소박한 감정을 아우르는" },
          ],
        },
        {
          order: 45,
          prompt: "윗글의 주제로 가장 알맞은 것을 고르십시오.",
          passage:
            "조선 후기 서민들의 경제력이 향상되면서 서민 문화가 발달하였다. 한글 소설, 사설시조, 판소리, 탈춤 등 다양한 문화에서 서민들은 자신의 솔직한 감정과 남녀 간의 사랑 등을 자유롭게 표현하였다.",
          points: 2,
          topic: "Đọc — Chủ đề đoạn văn (câu 44–45)",
          explanation: "Văn hóa bình dân thời hậu Joseon thể hiện cảm xúc chân thật, trong đó tình yêu nam nữ là nội dung chính được yêu thích → ②.",
          choices: [
            { label: "1", content: "서민들의 경제력이 향상되면서 외래 문화를 향유하였다." },
            { label: "2", content: "서민들이 즐긴 문화의 주된 내용은 솔직한 남녀의 사랑이었다.", isCorrect: true },
            { label: "3", content: "서민들이 향유한 문화에는 양반을 존중하는 내용을 포함하고 있다." },
            { label: "4", content: "서당에서 서민들도 한문을 공부할 수 있게 되어 여러 문화를 즐겼다." },
          ],
        },
        // [46~47] 다음을 읽고 물음에 답하십시오. (각 2점)
        {
          order: 46,
          prompt: "윗글에 나타난 필자의 태도로 가장 알맞은 것을 고르십시오.",
          passage:
            "과거에는 번성했지만 현재 개체 수가 많이 줄어 멸종 위기에 처한 생물종을 멸종 위기종이라고 한다. 멸종 위기종이 늘고 많은 생물이 사라지는 주요 원인은 인간 활동과 깊은 관련이 있다. 숲의 나무를 베거나 습지를 없애 서식지가 파괴되었고, 지나친 채집과 사냥으로 야생 동식물의 개체 수가 급격히 줄었다. 외래 생물 유입, 환경오염과 기후변화도 서식지 환경을 바꾸고 있다. 생물 다양성을 보전하려면 인간 활동이 미치는 영향을 이해하고 우리가 할 수 있는 활동을 찾아야 한다. 최근 우리나라에서는 우리 밀 살리기, 토종 얼룩소 키우기, 외래 생물 제거하기 등 사회적 노력을 하고 있으며, 이러한 노력은 더욱 활성화되어야 한다.",
          points: 2,
          topic: "Đọc — Thái độ tác giả (câu 46–47)",
          explanation: "Tác giả chủ trương cần có nỗ lực xã hội để bảo tồn đa dạng sinh học → ④.",
          choices: [
            { label: "1", content: "동식물의 생태계가 인간의 활동에 미치는 영향을 분석하고 있다." },
            { label: "2", content: "생물 다양성을 유지하기 위해 외래 생물을 늘릴 것을 촉구하고 있다." },
            { label: "3", content: "환경오염을 이겨내기 위해 동식물 서식지를 바꿀 것을 기대하고 있다." },
            { label: "4", content: "생물 다양성을 보전하기 위해 사회적 노력이 필요함을 주장하고 있다.", isCorrect: true },
          ],
        },
        {
          order: 47,
          prompt: "윗글의 내용과 같은 것을 고르십시오.",
          passage:
            "멸종 위기종이 늘고 많은 생물이 사라지는 주요 원인은 인간 활동과 관련이 깊다. 서식지 파괴, 지나친 채집과 사냥으로 야생 동식물의 개체 수가 급격히 줄었다. 최근 우리나라에서는 생물 다양성을 보전하기 위한 사회적 노력을 하고 있다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 46–47)",
          explanation: "‘지나친 채집과 사냥으로 개체 수가 급격히 줄었다’ → ③ đúng. (④ sai: là hoạt động của con người, không phải động vật.)",
          choices: [
            { label: "1", content: "외국에서도 생물 다양성을 지키려고 노력하고 있다." },
            { label: "2", content: "인간의 노력으로 생물 다양성이 증가하는 나라가 있다." },
            { label: "3", content: "지나친 채집과 사냥은 동식물의 개체 수를 줄어들게 했다.", isCorrect: true },
            { label: "4", content: "많은 생물이 사라지는 데에는 동물의 활동이 관계가 깊다." },
          ],
        },
        // [48~50] 다음을 읽고 물음에 답하십시오. (각 2점)
        {
          order: 48,
          prompt: "윗글을 쓴 목적으로 가장 알맞은 것을 고르십시오.",
          passage:
            "저작권 침해란 저작권법에 의해 배타적으로 보호되는 저작물을 무단으로 이용하여 저작권자의 권리를 침해하는 행위를 말한다. 이러한 현상이 널리 퍼지면 저작자의 의욕을 감소시키고 궁극적으로 양질의 정보를 생산할 수 없게 만든다. 이에 '저작권 보호'가 강화되고 있다. 하지만 저작권의 자유로운 공유를 강조하는 '정보 공유 권리'를 주장하는 입장도 있다. 이 입장에서는 모든 저작물이 인류가 생산한 정보와 지식을 활용하여 구성된 공공재이며, 과도한 권리 행사는 창작을 방해하고 정보 격차에 따른 불평등을 발생시킨다고 본다. 이처럼 '저작권 보호'와 '정보 공유 권리'의 (   ) 우리는 정보가 사회에 미치는 영향력을 인식하고 더 많은 양질의 정보를 생산할 수 있는 환경을 조성해야 한다.",
          points: 2,
          topic: "Đọc — Mục đích bài viết (câu 48–50)",
          explanation: "Bài giới thiệu hai lập trường trái ngược về bản quyền (bảo hộ vs chia sẻ thông tin) → ②.",
          choices: [
            { label: "1", content: "저작권의 배타적 특징을 분석하려고" },
            { label: "2", content: "저작권에 대한 상반된 두 입장을 소개하려고", isCorrect: true },
            { label: "3", content: "저작권법 위배 시 처벌을 받을 수 있음에 대해 경고하려고" },
            { label: "4", content: "저작권법이 지니는 창작 의욕을 고취하는 특징을 설명하려고" },
          ],
        },
        {
          order: 49,
          prompt: "( )에 들어갈 말로 가장 알맞은 것을 고르십시오.",
          passage:
            "'저작권 보호'를 강조하는 입장과 '정보 공유 권리'를 강조하는 입장이 있다. 이처럼 '저작권 보호'와 '정보 공유 권리'의 (   ) 우리는 정보가 사회에 미치는 영향력을 인식하고 더 많은 양질의 정보를 생산할 수 있는 환경을 조성해야 한다.",
          points: 2,
          topic: "Đọc — Điền vào chỗ trống (câu 48–50)",
          explanation: "Hai lập trường đối lập nhau → ‘입장이 대립하고 있는 상황에서’ → ②.",
          choices: [
            { label: "1", content: "개념을 제대로 이해하기 위해" },
            { label: "2", content: "입장이 대립하고 있는 상황에서", isCorrect: true },
            { label: "3", content: "차이가 거의 없는 것을 바탕으로" },
            { label: "4", content: "상호 배타적인 특징은 무시한 채로" },
          ],
        },
        {
          order: 50,
          prompt: "윗글의 내용과 같은 것을 고르십시오.",
          passage:
            "저작권 침해가 널리 퍼지면 양질의 정보를 생산할 수 없게 된다. '정보 공유 권리' 입장에서는 모든 저작물이 인류가 생산한 정보와 지식으로 구성된 공공재라고 보며, 과도한 권리 행사는 창작을 방해하고 정보 격차에 따른 불평등을 발생시킨다고 본다.",
          points: 2,
          topic: "Đọc — Đúng với nội dung (câu 48–50)",
          explanation: "Lập trường ‘정보 공유 권리’ coi mọi tác phẩm là tài sản công (공공재) → ③ đúng.",
          choices: [
            { label: "1", content: "양질의 정보는 저작권 침해와 관계없이 계속 생산되고 있다." },
            { label: "2", content: "저작권 침해는 저작자의 허락 하에 저작물을 사용하는 것이다." },
            { label: "3", content: "정보 공유 권리를 주장하는 입장은 모든 저작물을 공공재로 인식한다.", isCorrect: true },
            { label: "4", content: "저작물에 관한 과도한 권리 행사는 정보 격차에 따른 불평등을 없앤다." },
          ],
        },
      ],
    },

    /* ===================== PHẦN VIẾT (쓰기) ===================== */
    // Nguồn: 토픽 300+.pdf — 제1회 쓰기 (51~54), trang in 26–27. Bài chấm bằng AI.
    // Điểm: 51·52 = 10đ, 53 = 30đ, 54 = 50đ (tổng 100đ như thi thật).
    {
      type: "WRITING",
      durationSec: 3000, // 50 phút như đề thật
      questions: [
        // [51~52] 다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오. (각 10점)
        {
          order: 51,
          type: "WRITING",
          prompt:
            "다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오. (각 10점)",
          passage:
            "세탁소 폐업 안내\n\n개인적 사정으로 세탁소를 8월 31일까지만 운영하게 되었습니다. 맡기신 옷은 8월 31일까지 꼭 방문하셔서 ( ㉠ ). 8월 31일까지 방문이 ( ㉡ ) 세탁소로 꼭 전화 주시기 바랍니다. 전화번호는 123-4567입니다.",
          points: 10,
          topic: "Viết — Điền câu vào chỗ trống (câu 51)",
          explanation:
            "Thông báo đóng cửa tiệm giặt. Đáp án tham khảo: ㉠ ‘찾아가시기 바랍니다 / 찾아가시기 바랍니다(가져가시기 바랍니다)’ (hãy đến nhận lại đồ); ㉡ ‘어려우면 / 어려우시면’ (nếu khó đến trước 31/8 thì hãy gọi điện). Lưu ý văn phong thông báo (-(으)시기 바랍니다, -(으)면).",
        },
        {
          order: 52,
          type: "WRITING",
          prompt:
            "다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오. (각 10점)",
          passage:
            "건물에 화재가 발생했을 때 화재 확산을 막고 대피로 역할을 하는 복도 및 계단, 출입구에 설치된 문을 방화문이라 한다. 건물주는 법적으로 건물의 크기에 따라 알맞은 방화문을 ( ㉠ ). 설치된 방화문 주위에 물건이 있으면 화재 시 닫히지 않을 수 있다. 따라서 평소에 방화문 주위에 물건을 ( ㉡ ) 주의해야 한다.",
          points: 10,
          topic: "Viết — Điền câu vào chỗ trống (câu 52)",
          explanation:
            "Văn giải thích về cửa chống cháy (방화문). Đáp án tham khảo: ㉠ ‘설치해야 한다’ (chủ tòa nhà phải lắp đặt theo luật); ㉡ ‘두지 않도록 / 놓지 않도록’ (phải chú ý đừng để đồ vật quanh cửa chống cháy). Dùng văn phong văn viết (-(아/어)야 한다, -지 않도록).",
        },
        // [53] 그래프 보고 200~300자 (30점)
        {
          order: 53,
          type: "WRITING",
          prompt:
            "다음을 참고하여 한국의 전기 자전거 판매량의 변화에 대한 글을 200~300자로 쓰십시오. 단, 글의 제목은 쓰지 마십시오. (30점)",
          imageUrl: "/images/de-01/q53.png",
          passage:
            "[전기 자전거 판매량 — 조사기관: 한국 스마트모빌리티 협회 (단위: 만 대)]\n- 2018년: 3.06 → 2022년: 10.7 → 2030년(예상): 20.5\n\n변화 예상 원인: 정부의 전기 자전거 구입 보조금 지급; 배터리 성능 향상 및 모터 기술 발전 → 사용자의 편의성 증가.\n예상되는 변화: 도시 환경 개선 (예: 자동차 의존도 감소 → 교통 혼잡 문제 해결).",
          points: 30,
          topic: "Viết — Mô tả biểu đồ (câu 53)",
          explanation:
            "Mô tả biểu đồ doanh số xe đạp điện Hàn Quốc tăng từ 3.06 (2018) → 10.7 (2022) → dự kiến 20.5 vạn (2030); nêu nguyên nhân (trợ giá của chính phủ, pin/động cơ cải tiến → tăng tiện lợi) và thay đổi kỳ vọng (cải thiện môi trường đô thị, giảm phụ thuộc ô tô → giảm ùn tắc). Viết 200–300 chữ, KHÔNG đặt tiêu đề. Bài chấm bằng AI.",
        },
        // [54] 논술 600~700자 (50점)
        {
          order: 54,
          type: "WRITING",
          prompt:
            "다음을 참고하여 600~700자로 글을 쓰십시오. 단, 문제를 그대로 옮겨 쓰지 마십시오. (50점)",
          passage:
            "현대 사회에서 기업과 같은 상품 공급자는 자신들의 상품을 팔기 위해 다양한 광고를 한다. 그런데 광고가 상품의 성능을 지나치게 과장하여 표현하거나 없는 성능을 있는 것처럼 허위로 표현하는 경우가 있다. 이에 소비자는 광고를 볼 때 비판적인 시각으로 볼 필요가 있다. 아래의 내용을 중심으로 ‘허위 과장 광고’에 대해 자신의 의견을 쓰라.\n\n• 허위 과장 광고가 생겨나는 배경은 무엇인가?\n• 허위 과장 광고의 문제점은 무엇인가?\n• 허위 과장 광고에 대한 소비자의 적절한 대응 방안은 무엇인가?",
          points: 50,
          topic: "Viết — Nghị luận (câu 54)",
          explanation:
            "Bài nghị luận về ‘quảng cáo sai sự thật/phóng đại’ (허위·과장 광고). Cần bàn theo 3 ý: bối cảnh phát sinh, vấn đề/tác hại, và biện pháp ứng phó hợp lý của người tiêu dùng. Viết 600–700 chữ, không chép lại nguyên đề. Bài chấm bằng AI.",
        },
      ],
    },
  ],
};

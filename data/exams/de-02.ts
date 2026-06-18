import type { ExamSeed } from "./types";

// Audio phần Nghe (1 file cho cả đề). File: public/audio/de-02/full.mp3
const NGHE = "/audio/de-02/full.mp3";

/**
 * ĐỀ SỐ 2 — TOPIK 300+  (ĐANG NHẬP DẦN)
 *
 * TRẠNG THÁI:
 *  - ✅ NGHE 1–50: nội dung THẬT (토픽 300+.pdf, trang in 53–64). Đáp án đối chiếu lưới 정답
 *       제2회 (trang in 264, đọc ở DPI cao). Audio 1 file /audio/de-02/full.mp3 gắn cho mọi câu.
 *       Câu 1–3 đáp án tranh/biểu đồ → ảnh public/images/de-02/q0{1,2,3}.png.
 *  - ⏳ ĐỌC 1–50: chờ nhập (in 71–95).
 *  - ✅ VIẾT 51–54: nội dung THẬT (토픽 300+.pdf, trang in 67–68). Câu 53 kèm ảnh
 *       public/images/de-02/q53.png. Bài Viết chấm bằng AI.
 *
 * (Lựa chọn OCR từ ảnh scan ⇒ đáp án đã đối chiếu lưới; vài chữ Hàn có thể cần rà chính tả sau.)
 * Mỗi phần CÓ câu hỏi sẽ thành 1 đề con riêng khi import (splitByPart): "… · Nghe/Đọc/Viết".
 */
export const de02: ExamSeed = {
  title: "TOPIK II 300+ — Đề số 2",
  targetLevel: 4,
  description: "Đề số 2 sách TOPIK 300+.",
  isSample: false,
  sections: [
    /* ===================== PHẦN NGHE (듣기) ===================== */
    {
      type: "LISTENING",
      durationSec: 3600,
      questions: [
        // [1~3] 다음을 듣고 가장 알맞은 그림 또는 그래프를 고르십시오. (각 2점)
        {
          order: 1,
          prompt: "다음을 듣고 가장 알맞은 그림을 고르십시오. (4개 그림 중 선택)",
          audioUrl: NGHE,
          imageUrl: "/images/de-02/q01.png",
          points: 2,
          topic: "Nghe — Chọn tranh (câu 1–3)",
          explanation: "Nghe hội thoại và chọn bức tranh phù hợp. Đáp án: ①.",
          choices: [
            { label: "1", content: "그림 1", isCorrect: true },
            { label: "2", content: "그림 2" },
            { label: "3", content: "그림 3" },
            { label: "4", content: "그림 4" },
          ],
        },
        {
          order: 2,
          prompt: "다음을 듣고 가장 알맞은 그림을 고르십시오. (4개 그림 중 선택)",
          audioUrl: NGHE,
          imageUrl: "/images/de-02/q02.png",
          points: 2,
          topic: "Nghe — Chọn tranh (câu 1–3)",
          explanation: "Nghe hội thoại và chọn bức tranh phù hợp. Đáp án: ②.",
          choices: [
            { label: "1", content: "그림 1" },
            { label: "2", content: "그림 2", isCorrect: true },
            { label: "3", content: "그림 3" },
            { label: "4", content: "그림 4" },
          ],
        },
        {
          order: 3,
          prompt: "다음을 듣고 가장 알맞은 그래프를 고르십시오. (4개 그래프 중 선택)",
          audioUrl: NGHE,
          imageUrl: "/images/de-02/q03.png",
          points: 2,
          topic: "Nghe — Chọn biểu đồ (câu 1–3)",
          explanation: "Nghe và chọn biểu đồ khớp số liệu. Đáp án: ①.",
          choices: [
            { label: "1", content: "그래프 1", isCorrect: true },
            { label: "2", content: "그래프 2" },
            { label: "3", content: "그래프 3" },
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
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "그러면 지하철을 타는 게 낫겠네.", isCorrect: true },
            { label: "2", content: "미술관에 어떻게 가야 하는지 알아볼게." },
            { label: "3", content: "미술관까지 버스를 타고 가면 늦을 거야." },
            { label: "4", content: "그럼 내일 학교 앞 버스 정류장에서 만나자." },
          ],
        },
        {
          order: 5,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "수업 시간에 그림을 그리면 안 되지." },
            { label: "2", content: "그 포스터는 이쪽에 붙이는 게 어떨까?" },
            { label: "3", content: "저런 작업들이 생긴다면 정말 재미있겠다.", isCorrect: true },
            { label: "4", content: "나중에 취직하려면 지금 열심히 공부해야 해." },
          ],
        },
        {
          order: 6,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "강아지를 훈련시키는 것이 중요해." },
            { label: "2", content: "이 약을 먹으면 배가 안 아플 거야." },
            { label: "3", content: "먹이를 너무 많이 줘서 그런 거 아니야?" },
            { label: "4", content: "강아지를 동물병원에 데려가 보는 게 어때?", isCorrect: true },
          ],
        },
        {
          order: 7,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "신청서가 어디에 있나요?" },
            { label: "2", content: "전자 학생증도 가능한가요?", isCorrect: true },
            { label: "3", content: "여기에 학과명을 쓰면 되나요?" },
            { label: "4", content: "장학금 신청을 해야 하는지 몰랐어요." },
          ],
        },
        {
          order: 8,
          prompt: "다음 대화를 잘 듣고 이어질 수 있는 말을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Câu nối tiếp (câu 4–8)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "나도 정말 기대되는데?" },
            { label: "2", content: "그 식당은 예전부터 손님이 많았잖아." },
            { label: "3", content: "한 번 먹으면 너도 나처럼 좋아하게 될 거야.", isCorrect: true },
            { label: "4", content: "회사 근처에 맛있는 음식점이 많이 있으니까 좋네요." },
          ],
        },
        // [9~12] 다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오. (각 2점)
        {
          order: 9,
          prompt: "다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hành động tiếp theo (câu 9–12)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "따뜻한 수건으로 목을 찜질한다.", isCorrect: true },
            { label: "2", content: "고개를 높이 들고 핸드폰을 본다." },
            { label: "3", content: "치료 받을 수 있는 병원을 찾아간다." },
            { label: "4", content: "목을 천천히 움직이면서 고개를 숙인다." },
          ],
        },
        {
          order: 10,
          prompt: "다음 대화를 잘 듣고 여자가 이어서 할 행동으로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hành động tiếp theo (câu 9–12)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "불고기 도시락 재료를 확인한다." },
            { label: "2", content: "남아있는 재료로 도시락을 만든다." },
            { label: "3", content: "닭갈비 도시락과 비빔밥 도시락을 포장한다." },
            { label: "4", content: "포장해 갈 수 없는 음식 메뉴들을 알려준다.", isCorrect: true },
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
            { label: "1", content: "날짜를 다시 확인한다.", isCorrect: true },
            { label: "2", content: "토요일에 볼 영화표를 예매한다." },
            { label: "3", content: "가족들과 식사할 식당을 예약한다." },
            { label: "4", content: "친구에게 전화해 영화를 다음에 보자고 말한다." },
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
            { label: "1", content: "민수 씨에게 해바라기꽃을 가져다준다." },
            { label: "2", content: "해바라기꽃 그림을 배달해 주는 곳을 찾아본다.", isCorrect: true },
            { label: "3", content: "내일 남자와 같이 해바라기 그림을 사러 간다." },
            { label: "4", content: "민수 씨에게 짐들이 선물을 보낼 주소를 물어본다." },
          ],
        },
        // [13~16] 다음을 듣고 들은 내용과 같은 것을 고르십시오. (각 2점)
        {
          order: 13,
          prompt: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Đúng với nội dung (câu 13–16)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "여자는 다음 주에 발표하기로 했다." },
            { label: "2", content: "여자는 내일 오전에 남자를 만나기로 했다." },
            { label: "3", content: "남자는 내일 오후에 여자의 사무실로 갈 것이다.", isCorrect: true },
            { label: "4", content: "남자는 다음 주까지 발표 자료를 준비할 것이다." },
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
            { label: "1", content: "이 축제에는 아이들이 참여하는 프로그램이 있다.", isCorrect: true },
            { label: "2", content: "이번 요리 대회에는 14명의 요리사들이 참가한다." },
            { label: "3", content: "여러 나라의 음식을 맛보려면 비행기를 타야 한다." },
            { label: "4", content: "이번 주 토요일에 한국 전통 음식을 먹을 수 있다." },
          ],
        },
        {
          order: 15,
          prompt: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Đúng với nội dung (câu 13–16)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "이 승객은 배에 타려다 사고를 당했다.", isCorrect: true },
            { label: "2", content: "이 승객은 오후 1시쯤에 바다에 빠졌다." },
            { label: "3", content: "이 승객은 배에서 미끄러져 발을 다쳤다." },
            { label: "4", content: "이 승객은 낚시를 하다가 바다에 빠졌다." },
          ],
        },
        {
          order: 16,
          prompt: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Đúng với nội dung (câu 13–16)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "여자는 30년 전에 생긴 맛집에 가 봤다." },
            { label: "2", content: "여자의 책에는 여러 나라의 맛집이 나와 있다.", isCorrect: true },
            { label: "3", content: "여자는 새로 생긴 식당은 바로 찾아가 보는 편이다." },
            { label: "4", content: "여자는 요즘 책에 나온 식당이 좋은 식당이라고 생각한다." },
          ],
        },
        // [17~20] 다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오. (각 2점)
        {
          order: 17,
          prompt: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Ý chính (câu 17–20)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "일회용 종이컵을 사용하면 편하다." },
            { label: "2", content: "개인 컵을 사용하면 환경을 지킬 수 있다.", isCorrect: true },
            { label: "3", content: "한 번 쓰고 버리는 종이컵을 사용해야 한다." },
            { label: "4", content: "일회용 종이컵을 여러 번 사용하고 버려야 한다." },
          ],
        },
        {
          order: 18,
          prompt: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Ý chính (câu 17–20)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "물을 많이 마시는 것은 몸에 좋지 않다." },
            { label: "2", content: "물을 마실 때는 의사에게 물어봐야 한다." },
            { label: "3", content: "텔레비전에 나오는 말을 다 믿으면 안 된다." },
            { label: "4", content: "몸에 좋은 것도 자신의 몸 상태에 맞게 먹어야 한다.", isCorrect: true },
          ],
        },
        {
          order: 19,
          prompt: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Ý chính (câu 17–20)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "김밥은 들고 먹기에 편한 음식이다." },
            { label: "2", content: "김밥은 만들기도 간단하고 몸에도 좋다.", isCorrect: true },
            { label: "3", content: "김밥은 배가 고플 때 먹기 좋은 음식이다." },
            { label: "4", content: "김밥은 다양한 재료를 넣어 만들어야 한다." },
          ],
        },
        {
          order: 20,
          prompt: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Ý chính (câu 17–20)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "광고 포스터를 만들 때 글씨가 작으면 안 된다." },
            { label: "2", content: "광고 포스터가 눈에 띄려면 밝은색을 사용해야 한다." },
            { label: "3", content: "광고 포스터는 사람들에게 강한 인상을 주는 것이 중요하다.", isCorrect: true },
            { label: "4", content: "광고 포스터는 사람들이 많이 지나다니는 길에 붙이는 게 좋다." },
          ],
        },
        // [21~22] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 21,
          prompt: "남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 21–22)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "미라클 모닝을 하면 집중력이 향상된다.", isCorrect: true },
            { label: "2", content: "독서나 운동을 하면 몸이 피곤하지 않다." },
            { label: "3", content: "자기 계발은 한 달 이상 하는 것이 효과적이다." },
            { label: "4", content: "집중력을 기르려면 평소보다 2시간 일찍 일어나야 한다." },
          ],
        },
        {
          order: 22,
          prompt: "들은 내용으로 맞는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 21–22)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "남자는 매일 일찍 일어나서 몸이 피곤하다." },
            { label: "2", content: "남자는 일주일 전부터 독서와 운동을 하고 있다." },
            { label: "3", content: "남자는 마음먹은 일을 하기 위해 2시에 일어난다." },
            { label: "4", content: "남자는 자기 계발을 위해 미라클 모닝을 실천하고 있다.", isCorrect: true },
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
            { label: "1", content: "다음 학기 수업을 신청하고 있다." },
            { label: "2", content: "수강 신청 자격을 확인하고 있다.", isCorrect: true },
            { label: "3", content: "수강료 할인에 대해 안내하고 있다." },
            { label: "4", content: "수강 신청에 필요한 서류를 문의하고 있다." },
          ],
        },
        {
          order: 24,
          prompt: "들은 내용으로 맞는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 23–24)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "남자는 이번 학기에 영어 회화 수업을 들었다." },
            { label: "2", content: "수강 신청을 할 때 반드시 거주지를 말해야 한다." },
            { label: "3", content: "65세 이상이면 누구나 수강료 할인을 받을 수 있다." },
            { label: "4", content: "인주시에 거주하는 사람에 한해 수강 신청이 가능하다.", isCorrect: true },
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
            { label: "1", content: "즉석식품의 맛을 위해 말린 채소를 사용해야 한다." },
            { label: "2", content: "채소의 향과 색이 좋아지려면 얼리고 말려야 한다." },
            { label: "3", content: "즉석식품에는 향과 색이 유지된 말린 채소를 넣어야 한다.", isCorrect: true },
            { label: "4", content: "채소에 압력과 열을 가하면 채소의 특징이 변해서 좋지 않다." },
          ],
        },
        {
          order: 26,
          prompt: "들은 내용으로 맞는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 25–26)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "즉석식품에 넣는 채소는 높은 압력에서 말린 것이다." },
            { label: "2", content: "동결건조는 높은 온도에서 채소를 건조시키는 것이다." },
            { label: "3", content: "채소를 얼리고 열을 가하면 채소 속의 얼음이 없어진다." },
            { label: "4", content: "채소를 일반적인 방법으로 건조하면 색과 냄새가 변한다.", isCorrect: true },
          ],
        },
        // [27~28] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 27,
          prompt: "남자가 말하는 의도로 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 27–28)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "국민의 권리인 투표권에 대해 소개하려고" },
            { label: "2", content: "사전투표가 가능한 투표소의 위치를 안내하려고" },
            { label: "3", content: "사전투표를 하지 않는 것에 대해 불만을 말하려고" },
            { label: "4", content: "자신의 경험을 통해서 사전투표 방법을 알려주려고", isCorrect: true },
          ],
        },
        {
          order: 28,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 27–28)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "선거일에 출장을 가면 투표를 할 수 없다." },
            { label: "2", content: "출장을 가는 사람들만 사전투표를 할 수 있다." },
            { label: "3", content: "사전투표를 하려면 신분증을 가지고 가야 한다.", isCorrect: true },
            { label: "4", content: "선거 전에 미리 투표할 수 있는 제도가 올해 처음 생겼다." },
          ],
        },
        // [29~30] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 29,
          prompt: "남자는 누구인지 맞는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 29–30)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "머리카락을 가장 길게 기른 사람" },
            { label: "2", content: "암 치료로 머리카락이 빠져 우울한 사람" },
            { label: "3", content: "어린 암 환자들을 위해 머리카락을 기부한 사람", isCorrect: true },
            { label: "4", content: "기부한 머리카락으로 맞춤형 가발을 만드는 사람" },
          ],
        },
        {
          order: 30,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 29–30)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "남자는 머리를 길게 길러서 칭찬을 받았다." },
            { label: "2", content: "남자는 기부하기 위해 머리를 다시 기르기로 했다.", isCorrect: true },
            { label: "3", content: "남자는 암에 걸렸지만 희망을 갖고 치료를 잘 받았다." },
            { label: "4", content: "어린 암 환자를 위한 가발은 여자 머리카락으로 만들 수 없다." },
          ],
        },
        // [31~32] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 31,
          prompt: "남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 31–32)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "어린이들은 공원에서 공놀이를 자제해야 한다.", isCorrect: true },
            { label: "2", content: "어린이들은 늦은 시간에 공원에서 놀면 안 된다." },
            { label: "3", content: "어린이들이 공놀이를 할 수 있는 공원이 필요하다." },
            { label: "4", content: "공원에서 공놀이할 때 주민들의 허락을 받아야 한다." },
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
            { label: "1", content: "발생할 사고에 대해 염려하고 있다." },
            { label: "2", content: "문제의 해결 방안을 촉구하고 있다." },
            { label: "3", content: "여자의 의견에 조심스럽게 반박하고 있다." },
            { label: "4", content: "피해 사례를 바탕으로 자신의 주장을 펼치고 있다.", isCorrect: true },
          ],
        },
        // [33~34] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 33,
          prompt: "무엇에 대한 내용인지 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 33–34)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "거짓 정보를 구별하는 방법" },
            { label: "2", content: "사람들이 전염병에 걸리는 이유" },
            { label: "3", content: "거짓 정보가 사람들에게 미치는 영향" },
            { label: "4", content: "거짓 정보가 사람들에게 퍼져나가는 과정", isCorrect: true },
          ],
        },
        {
          order: 34,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 33–34)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "위기 상황에서 거짓 정보는 더 빨리 공유된다.", isCorrect: true },
            { label: "2", content: "전염병은 미디어나 온라인을 통해 퍼져나간다." },
            { label: "3", content: "신뢰할만한 정보는 사람들의 불안감을 높인다." },
            { label: "4", content: "미디어나 인터넷의 정보에는 항상 거짓 정보가 있다." },
          ],
        },
        // [35~36] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 35,
          prompt: "여자는 무엇을 하고 있는지 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 35–36)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "이탈리아의 유명 관광지를 소개하고 있다." },
            { label: "2", content: "베네치아를 관광하는 관광객 수를 발표하고 있다." },
            { label: "3", content: "베네치아를 관광할 때 불편한 점을 지적하고 있다." },
            { label: "4", content: "베네치아에 관광 입장료가 생긴 이유를 설명하고 있다.", isCorrect: true },
          ],
        },
        {
          order: 36,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 35–36)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "베네치아의 놀이공원은 입장료를 내야 한다." },
            { label: "2", content: "베네치아는 세계 최초로 물의 도시가 되었다." },
            { label: "3", content: "베네치아에서 숙박하면 입장료를 내지 않아도 된다.", isCorrect: true },
            { label: "4", content: "베네치아에 사는 주민들은 소음 때문에 두통이 생겼다." },
          ],
        },
        // [37~38] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 37,
          prompt: "여자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 37–38)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "생각하는 능력을 기르려면 반드시 독서를 해야 한다." },
            { label: "2", content: "책 내용을 요약한 영상 시청은 독서를 대신할 수 없다.", isCorrect: true },
            { label: "3", content: "책 내용이 모두 포함된 흥미로운 영상을 만들어야 한다." },
            { label: "4", content: "책을 읽는 대신 영상을 보면 새로운 지식을 얻을 수 있다." },
          ],
        },
        {
          order: 38,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 37–38)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "편집된 영상을 보면 분별력 향상에 도움이 된다." },
            { label: "2", content: "세상이 복잡해질수록 단순화된 영상이 많이 제작된다." },
            { label: "3", content: "책 내용을 편집한 영상을 시청하면 궁금한 것을 빨리 찾을 수 있다." },
            { label: "4", content: "짧고 흥미로운 영상을 보게 되면 균형 잡힌 생각을 할 수 없게 된다.", isCorrect: true },
          ],
        },
        // [39~40] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 39,
          prompt: "이 대화 전의 내용으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 39–40)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "불법 영상물에 유명인들이 나오는 일이 흔하게 일어나고 있다." },
            { label: "2", content: "인터넷에서 딥페이크 불법 영상물이 만들어지는 과정이 알려졌다." },
            { label: "3", content: "일반인들의 얼굴을 합성한 딥페이크 영상물이 확산되는 사건이 발생했다.", isCorrect: true },
            { label: "4", content: "딥페이크 영상물의 피해자들은 자신의 사진이 사용된 것을 알고 신고했다." },
          ],
        },
        {
          order: 40,
          prompt: "들은 내용과 같은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 39–40)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "인터넷에 개인 사진을 올리는 것은 불법이다." },
            { label: "2", content: "특정한 사람들만 딥페이크 영상물의 피해자가 된다." },
            { label: "3", content: "다른 사람들에게 딥페이크 영상물을 보내는 것은 불법이다.", isCorrect: true },
            { label: "4", content: "딥페이크 영상물은 유명인들의 사진만을 활용해 만들어진다." },
          ],
        },
        // [41~42] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 41,
          prompt: "이 강연의 중심 내용으로 맞는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 41–42)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "반드시 주차 위반 벌금을 납부해야 한다." },
            { label: "2", content: "주차 위반 벌금 납부 방법이 새로워졌다." },
            { label: "3", content: "개인 정보를 해킹하는 사기 수법에 주의해야 한다.", isCorrect: true },
            { label: "4", content: "주차 위반 스티커가 가짜인지 확인할 필요가 있다." },
          ],
        },
        {
          order: 42,
          prompt: "들은 내용과 일치하는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 41–42)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "가짜 주차 위반 스티커는 컴퓨터 해킹을 유도한다.", isCorrect: true },
            { label: "2", content: "주차 위반 벌금을 내려면 웹사이트를 방문해야 한다." },
            { label: "3", content: "가짜 주차 위반 스티커를 받으면 개인 정보가 사라진다." },
            { label: "4", content: "가짜 웹사이트에 방문하면 컴퓨터가 바이러스에 감염된다." },
          ],
        },
        // [43~44] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 43,
          prompt: "무엇에 대한 내용인지 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 43–44)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "물고기가 떼로 이동할 때의 장점", isCorrect: true },
            { label: "2", content: "물고기가 무리 지어 다니는 방향" },
            { label: "3", content: "물고기가 무리로 다닐 때의 모습" },
            { label: "4", content: "바닷속에서 물고기들이 이동하는 방법" },
          ],
        },
        {
          order: 44,
          prompt: "물고기들이 함께 다니는 것이 종족 번식에 유리한 이유로 맞는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 43–44)",
          explanation: "Đáp án: ④.",
          choices: [
            { label: "1", content: "체외 수정을 한 후 흩어지기 때문에" },
            { label: "2", content: "이동할 때 에너지를 절약하기 때문에" },
            { label: "3", content: "외부의 적이 습격하기 어렵기 때문에" },
            { label: "4", content: "암수가 만날 확률이 높아지기 때문에", isCorrect: true },
          ],
        },
        // [45~46] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 45,
          prompt: "들은 내용과 일치하는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 45–46)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "이 장치는 2년 전에 설치되었다." },
            { label: "2", content: "이 장치는 운전자에게 사각지대를 보여준다." },
            { label: "3", content: "이 장치는 차량과 보행자의 접근 여부를 판단한다.", isCorrect: true },
            { label: "4", content: "이 장치는 보행자가 교차로로 접근하는 것을 차단한다." },
          ],
        },
        {
          order: 46,
          prompt: "여자가 말하는 방식으로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 45–46)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "우회전 차량 사고가 발생하는 과정을 설명하고 있다." },
            { label: "2", content: "이 장치를 소개하면서 긍정적인 결과를 예측하고 있다.", isCorrect: true },
            { label: "3", content: "우회전 차량 사고를 예방하기 위한 대책을 제시하고 있다." },
            { label: "4", content: "이 장치로 인해 우회전 사고가 감소되었음을 증명하고 있다." },
          ],
        },
        // [47~48] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 47,
          prompt: "들은 내용과 일치하는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 47–48)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "임금피크제로 청년들이 모두 일자리를 갖게 되었다." },
            { label: "2", content: "고위직의 임금을 줄여도 청년 실업 문제를 해결하기 어렵다.", isCorrect: true },
            { label: "3", content: "정부는 근로 시간 단축을 통해 청년들에게 일자리를 제공한다." },
            { label: "4", content: "새로운 일자리를 창출하기 위해 민간 부문에서 노력해야 한다." },
          ],
        },
        {
          order: 48,
          prompt: "남자의 태도로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 47–48)",
          explanation: "Đáp án: ③.",
          choices: [
            { label: "1", content: "임금피크제의 도입을 반기고 있다." },
            { label: "2", content: "청년 실업의 심각성을 알리고 있다." },
            { label: "3", content: "정부가 내놓은 대책에 대해 회의적이다.", isCorrect: true },
            { label: "4", content: "공공 부문 일자리 창출을 우려하고 있다." },
          ],
        },
        // [49~50] 다음을 듣고 물음에 답하십시오. (각 2점)
        {
          order: 49,
          prompt: "들은 내용과 일치하는 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 49–50)",
          explanation: "Đáp án: ①.",
          choices: [
            { label: "1", content: "머그샷은 사회적으로 규정되지 않은 용어이다.", isCorrect: true },
            { label: "2", content: "머그샷 공개에서 범죄자의 개인 정보는 제외된다." },
            { label: "3", content: "머그샷을 활용하려면 반드시 대상자의 동의가 있어야 한다." },
            { label: "4", content: "머그샷 공개로 범죄자의 사회적 지위 박탈을 막을 수 있다." },
          ],
        },
        {
          order: 50,
          prompt: "여자의 태도로 가장 알맞은 것을 고르십시오.",
          audioUrl: NGHE,
          points: 2,
          topic: "Nghe — Hỏi đáp (câu 49–50)",
          explanation: "Đáp án: ②.",
          choices: [
            { label: "1", content: "범죄자의 인권침해에 대해 우려하고 있다." },
            { label: "2", content: "머그샷 공개의 긍정적인 효과를 기대하고 있다.", isCorrect: true },
            { label: "3", content: "범죄자 처벌에 대한 인식 변화를 당부하고 있다." },
            { label: "4", content: "머그샷 공개로 인한 수사기관의 어려움을 호소하고 있다." },
          ],
        },
      ],
    },
    /* ===================== PHẦN ĐỌC (읽기) — ĐANG NHẬP ===================== */
    // ĐÁP ÁN 읽기 제2회 (đã đọc lưới 정답 ở DPI cao, trang in 284):
    //  1④ 2② 3④ 4② 5① / 6④ 7③ 8① 9③ 10② / 11③ 12④ 13④ 14① 15③ /
    //  16① 17① 18② 19② 20③ / 21③ 22④ 23② 24④ 25② / 26④ 27② 28③ 29④ 30① /
    //  31② 32① 33① 34③ 35② / 36③ 37④ 38① 39④ 40③ / 41② 42① 43① 44③ 45② /
    //  46③ 47① 48④ 49③ 50③
    // (Câu 10 là biểu đồ "해수욕장 쓰레기양" → cần crop ảnh public/images/de-02/q10.png.)
    { type: "READING", durationSec: 4200, questions: [] }, // ➜ thêm câu Đọc (đề thật 50 câu)

    /* ===================== PHẦN VIẾT (쓰기) ===================== */
    // Nguồn: 토픽 300+.pdf — 제2회 쓰기 (51~54), trang in 67–68. Điểm: 51·52=10, 53=30, 54=50.
    {
      type: "WRITING",
      durationSec: 3000,
      questions: [
        // [51~52] 다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오. (각 10점)
        {
          order: 51,
          type: "WRITING",
          prompt: "다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오. (각 10점)",
          passage:
            "화장실 이용 안내\n\n화장실에서는 금연이므로 담배를 ( ㉠ ) 안 됩니다. 또한 화장실에 화장지가 없으니 미리 ( ㉡ ) 후에 이용하시기 바랍니다. 사람이 많을 때는 줄을 서서 기다리시기 바랍니다.",
          points: 10,
          topic: "Viết — Điền câu vào chỗ trống (câu 51)",
          explanation:
            "Bảng hướng dẫn dùng nhà vệ sinh. Đáp án tham khảo: ㉠ ‘피우면’ (cấm hút thuốc → 담배를 피우면 안 됩니다); ㉡ ‘준비한 / 준비하신’ (không có giấy nên hãy chuẩn bị trước khi dùng).",
        },
        {
          order: 52,
          type: "WRITING",
          prompt: "다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오. (각 10점)",
          passage:
            "사람은 다른 사람의 감정을 똑같이 느끼는 능력이 있다. 친구가 슬퍼하면 함께 슬퍼하고, 기뻐하면 함께 기뻐한다. 그런데 개도 사람의 감정을 똑같이 ( ㉠ ) 연구 결과가 나왔다. 이 연구에 따르면 개에게 사람의 웃음소리와 울음소리를 각각 들려줬을 때, 정확히 울음소리에만 ( ㉡ ). 하품을 하는 것은 개가 슬픈 감정을 느껴 스트레스를 받고 있다는 의미이다.",
          points: 10,
          topic: "Viết — Điền câu vào chỗ trống (câu 52)",
          explanation:
            "Văn về việc chó cảm nhận cảm xúc con người. Đáp án tham khảo: ㉠ ‘느낀다는’ (…개도 사람의 감정을 똑같이 느낀다는 연구 결과); ㉡ ‘하품을 했다 / 반응했다’ (chó chỉ ngáp khi nghe tiếng khóc — câu sau giải thích 하품).",
        },
        // [53] 그래프 보고 200~300자 (30점)
        {
          order: 53,
          type: "WRITING",
          prompt:
            "다음은 ‘한국인의 생활체육 참여율’에 대한 자료이다. 이 내용을 200~300자의 글로 쓰십시오. 단, 글의 제목은 쓰지 마십시오. (30점)",
          imageUrl: "/images/de-02/q53.png",
          passage:
            "[한국인의 생활체육 참여율 — 조사기관: 문화체육관광부]\n- 2012년: 35% → 2015년: 49% → 2018년: 52%\n\n성별 참여 종목 순위 — 남: 1위 등산, 2위 걷기, 3위 보디빌딩 / 여: 1위 걷기, 2위 등산, 3위 수영.\n변화 원인: 1) 건강에 대한 관심 증가, 2) 체육 동호회 수 증가.",
          points: 30,
          topic: "Viết — Mô tả biểu đồ (câu 53)",
          explanation:
            "Mô tả tỉ lệ người Hàn tham gia thể thao đời sống tăng 35%(2012)→49%(2015)→52%(2018); môn ưa thích theo giới (nam: leo núi/đi bộ/thể hình; nữ: đi bộ/leo núi/bơi); nguyên nhân (quan tâm sức khỏe tăng, số câu lạc bộ thể thao tăng). Viết 200–300 chữ, không đặt tiêu đề. Bài chấm bằng AI.",
        },
        // [54] 논술 600~700자 (50점)
        {
          order: 54,
          type: "WRITING",
          prompt:
            "다음을 참고하여 600~700자로 글을 쓰십시오. 단, 문제를 그대로 옮겨 쓰지 마십시오. (50점)",
          passage:
            "키오스크는 가게나 식당 등에서 직원 대신 서비스를 제공하기 위해 설치된 기기로 손님들이 화면을 눌러 주문하거나 결제할 수 있다. 이러한 기능을 갖춘 키오스크의 등장으로 최근 직원을 채용하는 대신 키오스크를 설치하는 곳이 늘고 있다. 아래의 내용을 중심으로 ‘키오스크’의 장점과 문제점에 대해 자신의 의견을 쓰라.\n\n• 키오스크 사용의 장점은 무엇인가?\n• 키오스크 사용의 문제점은 무엇인가?\n• 키오스크 사용의 문제점을 해결할 수 있는 방법은 무엇인가?",
          points: 50,
          topic: "Viết — Nghị luận (câu 54)",
          explanation:
            "Bài nghị luận về ‘kiosk’ (máy gọi món/thanh toán tự động). Bàn theo 3 ý: ưu điểm, vấn đề/bất cập, và cách khắc phục. Viết 600–700 chữ, không chép nguyên đề. Bài chấm bằng AI.",
        },
      ],
    },
  ],
};

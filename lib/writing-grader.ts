import Groq from "groq-sdk";

export interface WritingGrade {
  score: number; // điểm đạt được (0..maxScore)
  strengths: string; // điểm mạnh
  weaknesses: string; // điểm cần cải thiện
  suggestion: string; // gợi ý cải thiện
}

// Model miễn phí trên Groq. Đổi tại đây nếu muốn model khác.
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `Bạn là giám khảo chấm phần Viết (쓰기) của kỳ thi TOPIK II.
Hãy chấm bài viết tiếng Hàn của thí sinh dựa trên: nội dung có đúng yêu cầu đề không, độ phong phú và chính xác của từ vựng/ngữ pháp, tính mạch lạc, và độ dài.
Cho điểm trong khoảng từ 0 đến điểm tối đa được cung cấp. Mọi nhận xét viết BẰNG TIẾNG VIỆT, ngắn gọn, cụ thể, mang tính xây dựng.
Nếu bài làm để trống hoặc không liên quan, cho 0 điểm và giải thích.
Chỉ trả về một đối tượng JSON đúng cấu trúc {"score": number, "strengths": string, "weaknesses": string, "suggestion": string}, KHÔNG kèm bất kỳ chữ nào khác.`;

/** Trích đối tượng JSON đầu tiên trong chuỗi (phòng khi mô hình kèm chữ thừa). */
function extractJson(text: string): WritingGrade | null {
  try {
    return JSON.parse(text) as WritingGrade;
  } catch {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end <= start) return null;
    try {
      return JSON.parse(text.slice(start, end + 1)) as WritingGrade;
    } catch {
      return null;
    }
  }
}

/**
 * Chấm một câu Viết bằng Groq (LLM miễn phí). Trả về null nếu thiếu API key
 * hoặc lỗi gọi API (để không làm hỏng luồng nộp bài).
 */
export async function gradeWriting(params: {
  prompt: string;
  answer: string;
  maxScore: number;
}): Promise<WritingGrade | null> {
  if (!process.env.GROQ_API_KEY) return null;
  const answer = params.answer?.trim();
  if (!answer) {
    return { score: 0, strengths: "", weaknesses: "Bài làm để trống.", suggestion: "Hãy viết bài trả lời theo yêu cầu của đề." };
  }

  try {
    const client = new Groq();
    const res = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 1024,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Đề bài:\n${params.prompt}\n\nBài làm của thí sinh:\n${answer}\n\nĐiểm tối đa: ${params.maxScore}\n\nTrả về JSON.`,
        },
      ],
    });

    const content = res.choices[0]?.message?.content;
    if (!content) return null;
    const parsed = extractJson(content);
    if (!parsed) return null;
    // kẹp điểm trong [0, maxScore]
    const score = Math.max(0, Math.min(params.maxScore, Math.round(Number(parsed.score) || 0)));
    return { ...parsed, score };
  } catch (err) {
    console.error("[writing-grader] lỗi gọi Groq:", err);
    return null;
  }
}

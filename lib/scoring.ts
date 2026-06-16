/** Kiểu dữ liệu tối thiểu để chấm điểm. */
export interface GradableChoice {
  id: string;
  isCorrect: boolean;
}
export interface GradableQuestion {
  id: string;
  points: number;
  type: string; // "MULTIPLE_CHOICE" | "WRITING"
  choices: GradableChoice[];
}

export interface SubmittedAnswer {
  questionId: string;
  choiceId?: string | null;
  textAnswer?: string | null;
}

export interface GradedAnswer {
  questionId: string;
  choiceId: string | null;
  textAnswer: string | null;
  isCorrect: boolean;
}

export interface GradeResult {
  score: number;
  maxScore: number;
  graded: GradedAnswer[];
}

/**
 * Chấm điểm trắc nghiệm tự động.
 * Câu tự luận (WRITING) không tự chấm — chỉ lưu lại, không tính điểm tự động.
 */
export function gradeAttempt(
  questions: GradableQuestion[],
  answers: SubmittedAnswer[]
): GradeResult {
  const answerByQ = new Map(answers.map((a) => [a.questionId, a]));
  let score = 0;
  let maxScore = 0;
  const graded: GradedAnswer[] = [];

  for (const q of questions) {
    const submitted = answerByQ.get(q.id);
    if (q.type === "MULTIPLE_CHOICE") {
      maxScore += q.points;
      const correctChoice = q.choices.find((c) => c.isCorrect);
      const isCorrect = !!submitted?.choiceId && submitted.choiceId === correctChoice?.id;
      if (isCorrect) score += q.points;
      graded.push({
        questionId: q.id,
        choiceId: submitted?.choiceId ?? null,
        textAnswer: null,
        isCorrect,
      });
    } else {
      // WRITING: lưu nội dung, không tự chấm.
      graded.push({
        questionId: q.id,
        choiceId: null,
        textAnswer: submitted?.textAnswer ?? null,
        isCorrect: false,
      });
    }
  }

  return { score, maxScore, graded };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface CourseQuiz {
  courseName: string;
  questions: QuizQuestion[];
}

export type QuizDataMap = Record<string, CourseQuiz>;

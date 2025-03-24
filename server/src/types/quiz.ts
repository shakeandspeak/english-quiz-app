export interface IQuestion {
  questionText: string;
  questionType: 'multiple-choice' | 'true-false' | 'fill-in-blank';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface IQuiz {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: IQuestion[];
  timeLimit?: number;
  createdAt?: Date;
  updatedAt?: Date;
} 
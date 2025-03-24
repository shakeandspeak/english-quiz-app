export interface IQuestion {
  type: 'multiple-choice' | 'fill-in-blank' | 'matching' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface IQuiz {
  _id?: string;
  title: string;
  description: string;
  questions: IQuestion[];
  timeLimit?: number; // in minutes
  createdAt?: Date;
  updatedAt?: Date;
} 
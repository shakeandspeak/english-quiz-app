import { Schema, model } from 'mongoose';

interface IQuestion {
  questionText: string;
  questionType: 'multiple-choice' | 'true-false' | 'fill-in-blank';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

interface IQuiz {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: IQuestion[];
  timeLimit?: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  questionText: { type: String, required: true },
  questionType: {
    type: String,
    required: true,
    enum: ['multiple-choice', 'true-false', 'fill-in-blank']
  },
  options: [String],
  correctAnswer: { type: Schema.Types.Mixed, required: true },
  points: { type: Number, required: true }
});

const QuizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  questions: [QuestionSchema],
  timeLimit: Number
}, {
  timestamps: true
});

export const Quiz = model<IQuiz>('Quiz', QuizSchema);
export type { IQuiz, IQuestion }; 
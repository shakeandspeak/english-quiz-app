import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion {
  type: 'multiple-choice' | 'fill-in-blank' | 'matching' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface IQuiz extends Document {
  title: string;
  description: string;
  questions: IQuestion[];
  timeLimit?: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  type: {
    type: String,
    enum: ['multiple-choice', 'fill-in-blank', 'matching', 'true-false'],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: Schema.Types.Mixed,
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 1
  }
});

const QuizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  questions: [QuestionSchema],
  timeLimit: {
    type: Number
  }
}, {
  timestamps: true
});

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema); 
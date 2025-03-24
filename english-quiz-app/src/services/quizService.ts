import axios from 'axios';
import { IQuiz } from '../../../shared/types/quiz';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const quizService = {
  // Create a new quiz
  createQuiz: async (quiz: Omit<IQuiz, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post(`${API_URL}/quizzes`, quiz);
    return response.data;
  },

  // Get all quizzes
  getAllQuizzes: async () => {
    const response = await axios.get(`${API_URL}/quizzes`);
    return response.data;
  },

  // Get a single quiz by ID
  getQuizById: async (id: string) => {
    const response = await axios.get(`${API_URL}/quizzes/${id}`);
    return response.data;
  },

  // Update a quiz
  updateQuiz: async (id: string, quiz: Partial<IQuiz>) => {
    const response = await axios.put(`${API_URL}/quizzes/${id}`, quiz);
    return response.data;
  },

  // Delete a quiz
  deleteQuiz: async (id: string) => {
    const response = await axios.delete(`${API_URL}/quizzes/${id}`);
    return response.data;
  },
}; 
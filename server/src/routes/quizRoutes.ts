import { Router } from 'express';
import { createQuiz, getAllQuizzes, getQuizById } from '../controllers/quizController';

const router = Router();

// Quiz routes
router.post('/', createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', getQuizById);

export default router; 
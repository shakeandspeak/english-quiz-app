import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import QuizCreator from '../components/QuizCreator';
import { quizService } from '../services/quizService';
import { useNavigate } from 'react-router-dom';

const CreateQuizPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (quiz: { title: string; description: string; questions: any[] }) => {
    try {
      await quizService.createQuiz(quiz);
      navigate('/quizzes'); // Navigate to quizzes list after successful creation
    } catch (error) {
      console.error('Error creating quiz:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Create New Quiz
        </Typography>
        <QuizCreator onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default CreateQuizPage; 
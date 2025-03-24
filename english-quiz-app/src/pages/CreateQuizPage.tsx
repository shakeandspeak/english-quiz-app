import React from 'react';
import { Container, Typography } from '@mui/material';
import QuizCreator from '../components/QuizCreator';

const CreateQuizPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
        Create New Quiz
      </Typography>
      <QuizCreator />
    </Container>
  );
};

export default CreateQuizPage; 
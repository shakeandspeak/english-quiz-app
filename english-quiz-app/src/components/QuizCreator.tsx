import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { quizService } from '../services/quizService';
import { IQuiz, IQuestion } from '../../../shared/types/quiz';

const QuizCreator: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'multiple-choice',
        question: '',
        options: [''],
        correctAnswer: '',
        points: 1
      }
    ]);
  };

  const handleQuestionChange = (index: number, field: keyof IQuestion, value: any) => {
    if (index < 0 || index >= questions.length) return;
    
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    if (questionIndex < 0 || questionIndex >= questions.length) return;
    
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    if (!question.options) return;
    
    question.options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (questionIndex: number) => {
    if (questionIndex < 0 || questionIndex >= questions.length) return;
    
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    if (!question.options) return;
    
    question.options.push('');
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    if (questionIndex < 0 || questionIndex >= questions.length) return;
    
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    if (!question.options) return;
    
    question.options = question.options.filter((_, i) => i !== optionIndex);
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const newQuiz: Omit<IQuiz, '_id' | 'createdAt' | 'updatedAt'> = {
        title,
        description,
        questions
      };

      await quizService.createQuiz(newQuiz);
      // Reset form
      setTitle('');
      setDescription('');
      setQuestions([]);
    } catch (err) {
      setError('Failed to create quiz. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create New Quiz
        </Typography>

        <TextField
          fullWidth
          label="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Questions
        </Typography>

        <List>
          {questions.map((question, questionIndex) => (
            <ListItem key={questionIndex} divider>
              <Box sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label={`Question ${questionIndex + 1}`}
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  margin="normal"
                  required
                />

                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1">Options:</Typography>
                  {question.options?.map((option, optionIndex) => (
                    <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <TextField
                        fullWidth
                        label={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        required
                      />
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveOption(questionIndex, optionIndex)}
                        disabled={!question.options || question.options.length <= 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => handleAddOption(questionIndex)}
                    sx={{ mt: 1 }}
                  >
                    Add Option
                  </Button>
                </Box>

                <TextField
                  fullWidth
                  label="Correct Answer"
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
                  margin="normal"
                  required
                />

                <TextField
                  fullWidth
                  label="Points"
                  type="number"
                  value={question.points}
                  onChange={(e) => handleQuestionChange(questionIndex, 'points', parseInt(e.target.value))}
                  margin="normal"
                  required
                />

                <IconButton
                  color="error"
                  onClick={() => handleRemoveQuestion(questionIndex)}
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>

        <Button
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
          sx={{ mt: 2 }}
        >
          Add Question
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={!title || questions.length === 0}
        >
          Create Quiz
        </Button>
      </Paper>
    </Box>
  );
};

export default QuizCreator; 
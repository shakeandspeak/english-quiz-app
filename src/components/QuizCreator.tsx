import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IQuestion } from '../../server/models/Quiz';

interface QuizCreatorProps {
  onSubmit: (quiz: { title: string; description: string; questions: IQuestion[] }) => void;
}

const QuizCreator: React.FC<QuizCreatorProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'multiple-choice',
        question: '',
        options: [''],
        correctAnswer: '',
        points: 1,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof IQuestion, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, questions });
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Quiz
      </Typography>
      <form onSubmit={handleSubmit}>
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
          required
        />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Questions
          </Typography>
          {questions.map((question, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="subtitle1">Question {index + 1}</Typography>
                <IconButton onClick={() => removeQuestion(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Question Type</InputLabel>
                <Select
                  value={question.type}
                  onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                  label="Question Type"
                >
                  <MenuItem value="multiple-choice">Multiple Choice</MenuItem>
                  <MenuItem value="fill-in-blank">Fill in the Blank</MenuItem>
                  <MenuItem value="matching">Matching</MenuItem>
                  <MenuItem value="true-false">True/False</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Question"
                value={question.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                margin="normal"
                required
              />

              {question.type === 'multiple-choice' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Options</Typography>
                  {question.options?.map((option, optionIndex) => (
                    <Box key={optionIndex} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <TextField
                        fullWidth
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(question.options || [])];
                          newOptions[optionIndex] = e.target.value;
                          updateQuestion(index, 'options', newOptions);
                        }}
                        size="small"
                      />
                      <IconButton
                        onClick={() => {
                          const newOptions = question.options?.filter((_, i) => i !== optionIndex);
                          updateQuestion(index, 'options', newOptions);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => {
                      const newOptions = [...(question.options || []), ''];
                      updateQuestion(index, 'options', newOptions);
                    }}
                  >
                    Add Option
                  </Button>
                </Box>
              )}

              <TextField
                fullWidth
                label="Correct Answer"
                value={question.correctAnswer}
                onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Points"
                type="number"
                value={question.points}
                onChange={(e) => updateQuestion(index, 'points', parseInt(e.target.value))}
                margin="normal"
                required
              />
            </Paper>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={addQuestion}
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Add Question
          </Button>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Create Quiz
        </Button>
      </form>
    </Paper>
  );
};

export default QuizCreator; 
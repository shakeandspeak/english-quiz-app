import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import CreateQuizPage from './pages/CreateQuizPage';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              English Quiz App
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/create-quiz">
              Create Quiz
            </Button>
            <Button color="inherit" component={Link} to="/quizzes">
              View Quizzes
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <Routes>
            <Route path="/" element={<Typography variant="h4" sx={{ mt: 4 }}>Welcome to English Quiz App</Typography>} />
            <Route path="/create-quiz" element={<CreateQuizPage />} />
            <Route path="/quizzes" element={<Typography variant="h4" sx={{ mt: 4 }}>Quizzes List (Coming Soon)</Typography>} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App; 
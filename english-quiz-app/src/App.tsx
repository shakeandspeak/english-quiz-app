import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import CreateQuizPage from './pages/CreateQuizPage';

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            English Quiz App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Create Quiz
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Typography variant="h4">Welcome to English Quiz App</Typography>} />
          <Route path="/create" element={<CreateQuizPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

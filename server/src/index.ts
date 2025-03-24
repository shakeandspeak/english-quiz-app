import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import quizRoutes from './routes/quizRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to English Quiz API',
    endpoints: {
      health: '/health',
      quizzes: {
        list: '/api/quizzes',
        create: '/api/quizzes',
        getById: '/api/quizzes/:id',
      }
    }
  });
});

// Health check
app.get('/health', (_req: Request, res: Response, next: NextFunction) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/quizzes', quizRoutes);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/english-quiz';

mongoose.connect(MONGODB_URI, {
  retryWrites: true,
  w: 'majority',
  retryReads: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error details:', {
      message: error.message,
      code: error.code,
      name: error.name,
      uri: MONGODB_URI.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, 'mongodb+srv://[hidden]:[hidden]@')
    });
    process.exit(1);
  }); 
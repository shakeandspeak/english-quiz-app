# English Quiz App

A full-stack application for creating and taking English language quizzes. Built with React, Node.js, Express, and MongoDB.

## Features

- Create and manage quizzes
- Multiple choice questions
- Points system
- Modern Material-UI interface
- Responsive design

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Material-UI
  - Vite

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/english-quiz-app.git
cd english-quiz-app
```

2. Install backend dependencies:
```bash
cd server
npm install
```

3. Install frontend dependencies:
```bash
cd ../english-quiz-app
npm install
```

4. Create environment files:

For backend (`server/.env`):
```
PORT=5001
MONGODB_URI=your_mongodb_uri
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

For frontend (`english-quiz-app/.env`):
```
VITE_API_URL=http://localhost:5001/api
```

5. Start the development servers:

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd english-quiz-app
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## Deployment

The application is deployed using:
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

## License

MIT 
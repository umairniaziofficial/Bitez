import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import connectToDatabase from './lib/db';

const app = express();

// Connect to MongoDB
connectToDatabase()
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

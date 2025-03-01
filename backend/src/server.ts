import dotenv from 'dotenv';
import cors from 'cors';
import express, { Request, Response } from 'express';
import connectToDatabase from './lib/db';

// Load environment variables early
dotenv.config();

// Constants
const PORT = process.env.PORT || 5000;

// Initialize express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', message: 'API is running' });
});

// Server startup function
async function startServer() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    console.log('Connected to MongoDB');

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Server shutting down');
  process.exit(0);
});

// Start the server
startServer();

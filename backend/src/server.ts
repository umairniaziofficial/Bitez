import { config } from './config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import connectToDatabase from './lib/db';
import authRoutes from './routes/auth';

const PORT = config.server.port;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(authRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', message: 'API is running' });
});

async function startServer() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', () => {
  console.log('🛑 Server shutting down');
  process.exit(0);
});

startServer();

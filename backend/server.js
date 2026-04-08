import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';
import adminRoutes from './routes/admin.js';
import messageRoutes from './routes/messages.js';
import visitRoutes from './routes/visits.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from a single backend/.env file.
// Set NODE_ENV inside this file to "development" or "production".
dotenv.config({ path: path.join(__dirname, '.env') });
const environment = process.env.NODE_ENV || 'development';
const isVercel = process.env.VERCEL === '1';

const app = express();
const PORT = process.env.PORT || 5000;
const requiredEnvVars = ['MONGODB_URI', 'ADMIN_PASSWORD', 'ADMIN_SESSION_SECRET'];

const allowedOrigins = (
  process.env.FRONTEND_URLS || process.env.FRONTEND_URL || 'http://localhost:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const getMissingEnvVars = () =>
  requiredEnvVars.filter(
    (name) => !process.env[name] || !process.env[name].trim(),
  );

const ensureEnvironmentReady = () => {
  const missingEnvVars = getMissingEnvVars();
  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`,
    );
  }
};

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
}));

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from tools with no origin (e.g. curl, health checks).
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Ensure env + database are available for all API routes in serverless/runtime.
app.use('/api', async (req, res, next) => {
  try {
    ensureEnvironmentReady();
    await connectDB();
    next();
  } catch (error) {
    console.error('API initialization error:', error);
    res.status(500).json({
      error: 'Backend configuration error',
      message:
        environment === 'development'
          ? error.message
          : 'Server is not configured correctly',
    });
  }
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/visits', visitRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const startServer = async () => {
  try {
    ensureEnvironmentReady();
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${environment}`);
      console.log(`Allowed frontend origins: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

if (!isVercel) {
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...');
    process.exit(0);
  });

  startServer();
}

export default app;

import mongoose from 'mongoose';

let connectPromise = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectPromise) {
    await connectPromise;
    return mongoose.connection;
  }

  const dbName = process.env.MONGODB_DB_NAME || 'portfolio';
  connectPromise = mongoose.connect(process.env.MONGODB_URI, { dbName });

  try {
    const conn = await connectPromise;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoDB Database: ${conn.connection.name}`);
    return conn.connection;
  } finally {
    connectPromise = null;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};

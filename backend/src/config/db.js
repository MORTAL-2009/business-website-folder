import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hoosty_db';
  
  try {
    mongoose.set('strictQuery', false);
    
    // Connection options: 10s timeout to allow secure cloud handshake (Atlas)
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] Note: MongoDB connection not established (${error.message}). Running in fallback mode with default JSON store until database is configured.`);
  }

  mongoose.connection.on('connected', () => {
    isConnected = true;
    console.log('[Database] MongoDB connection established.');
  });

  mongoose.connection.on('error', (err) => {
    isConnected = false;
    console.error(`[Database] MongoDB error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('[Database] MongoDB disconnected.');
  });
};

export const getDbStatus = () => isConnected;

import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/cozinharamos');
    console.log('🍃 MongoDB Conectado!');
  } catch (err) {
    console.error('❌ Erro ao conectar ao Mongo:', err);
    process.exit(1);
  }
};
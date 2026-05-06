import path from 'path';
import express from 'express';
import cors from 'cors';
import { connectDB } from './database';
import authRoutes from './routes/auth';
import pedidoRoutes from './routes/pedidos';
import produtoRoutes from './routes/produtos';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/images', express.static(path.resolve(__dirname, '../public/images')));
app.use('/auth', authRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/produtos', produtoRoutes);

app.listen(3001, () => console.log('🚀 Cozinha Ramos Backend Online!'));
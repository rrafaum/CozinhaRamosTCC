import express from 'express';
import cors from 'cors';
import { connectDB } from './database';
import authRoutes from './routes/auth';
import pedidoRoutes from './routes/pedidos';

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/auth', authRoutes);
app.use('/pedidos', pedidoRoutes);

app.listen(3001, () => console.log('🚀 Cozinha Ramos Backend Online!'));
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './database';
import authRoutes from './routes/auth';
import { Produto } from './models/Produto';

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

connectDB();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.get('/', (req, res) => {
  res.send(`🚀 API Cozinha Ramos rodando!`);
});

app.use('/auth', authRoutes);

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.post('/pedidos', (req, res) => {
  const pedido = req.body;

  if (!pedido || !pedido.itens || pedido.itens.length === 0) {
    return res.status(400).json({ 
      error: 'Pedido inválido', 
      message: 'O carrinho não pode estar vazio para finalizar um pedido.' 
    });
  }

  console.log('Pedido recebido via API:', pedido);
  res.status(201).json({ 
    message: 'Pedido registrado com sucesso!', 
    status: 'success' 
  });
});

app.listen(PORT, () => console.log(`🚀 Server on ${BASE_URL}`));
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { Produto } from '@shared/types/Produto';

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.get('/', (req, res) => {
  res.send(`🚀 API Cozinha Ramos rodando! Acesse <a href="/produtos">/produtos</a> para ver os dados.`);
});

const produtos: Produto[] = [
  {
    id: '1',
    nome: 'Feijoada Completa',
    descricao: 'Acompanha arroz branco, couve refogada, farofa da casa e laranja.',
    preco: 45.90,
    categoria: 'Pratos',
    imagem: `${BASE_URL}/images/feijoada.jpg`,
    disponivel: true
  },
  {
    id: '2',
    nome: 'Frango com Quiabo',
    descricao: 'Tradicional frango caipira com quiabo fresquinho e polenta cremosa.',
    preco: 38.00,
    categoria: 'Pratos',
    imagem: `${BASE_URL}/images/frango-com-quiabo.jpg`,
    disponivel: true
  },
  {
    id: '3',
    nome: 'Suco de Laranja 500ml',
    descricao: 'Suco natural da fruta, gelado e sem açúcar adicionado.',
    preco: 12.00,
    categoria: 'Bebidas',
    imagem: `${BASE_URL}/images/suco-de-laranja.jpg`,
    disponivel: true
  },
  {
    id: '4',
    nome: 'Palha Italiana',
    descricao: 'Delicioso doce de brigadeiro gourmet com pedaços crocantes de biscoito.',
    preco: 5.00,
    categoria: 'Sobremesas',
    imagem: `${BASE_URL}/images/palha-italiana.jpg`,
    disponivel: true
  },
  {
    id: '5',
    nome: 'Coca Cola KS',
    descricao: 'Um refrigerante saboroso para qualquer momento.',
    preco: 7.00,
    categoria: 'Bebidas',
    imagem: `${BASE_URL}/images/coca-cola-ks.jpg`,
    disponivel: true
  },
  {
    id: '6',
    nome: 'Mousse de Maracujá',
    descricao: 'Feito da fruta com folhas de hortelã para dar frescor.',
    preco: 6.00,
    categoria: 'Sobremesas',
    imagem: `${BASE_URL}/images/mousse-de-maracuja.jpg`,
    disponivel: true
  }
];

app.get('/produtos', (req, res) => {
  res.json(produtos);
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

app.listen(PORT, () => {
  console.log(`🚀 Backend Cozinha Ramos rodando em ${BASE_URL}`);
});
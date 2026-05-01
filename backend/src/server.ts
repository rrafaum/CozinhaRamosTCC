import express from 'express';
import cors from 'cors';
import path from 'path';
import { Produto } from '@shared/types/Produto';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(process.cwd(), 'public/images')));

const produtos: Produto[] = [
  {
    id: '1',
    nome: 'Feijoada Completa',
    descricao: 'Acompanha arroz branco, couve refogada, farofa da casa e laranja.',
    preco: 45.90,
    categoria: 'Pratos',
    imagem: 'http://localhost:3001/images/feijoada.jpg',
    disponivel: true
  },
  {
    id: '2',
    nome: 'Frango com Quiabo',
    descricao: 'Tradicional frango caipira com quiabo fresquinho e polenta cremosa.',
    preco: 38.00,
    categoria: 'Pratos',
    imagem: 'http://localhost:3001/images/frango-com-quiabo.jpg',
    disponivel: false
  },
  {
    id: '3',
    nome: 'Suco de Laranja 500ml',
    descricao: 'Suco natural da fruta, gelado e sem açúcar adicionado.',
    preco: 12.00,
    categoria: 'Bebidas',
    imagem: 'http://localhost:3001/images/suco-de-laranja.jpg',
    disponivel: true
  },
  {
    id: '4',
    nome: 'Palha Italiana',
    descricao: 'Delicioso doce de brigadeiro gourmet com pedaços crocantes de biscoito.',
    preco: 5.00,
    categoria: 'Sobremesas',
    imagem: 'http://localhost:3001/images/palha-italiana.jpg',
    disponivel: true
  },
  {
    id: '5',
    nome: 'Coca Cola KS',
    descricao: 'Um refrigerante saboroso para qualquer momento.',
    preco: 7.00,
    categoria: 'Bebidas',
    imagem: 'http://localhost:3001/images/coca-cola-ks.jpg',
    disponivel: true
  },
  {
    id: '6',
    nome: 'Mousse de Maracujá',
    descricao: 'Feito da fruta com folhas de hortelã para dar frescor.',
    preco: 6.00,
    categoria: 'Sobremesas',
    imagem: 'http://localhost:3001/images/mousse-de-maracuja.jpg',
    disponivel: false
  }
];

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.post('/pedidos', (req, res) => {
  const pedido = req.body;
  console.log('Pedido recebido:', pedido);
  res.status(201).json({ message: 'Pedido registrado com sucesso!', pedido });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend Cozinha Ramos rodando em http://localhost:${PORT}`);
});
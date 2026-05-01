import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const produtos = [
  {
    id: '1',
    nome: 'Feijoada Completa',
    descricao: 'Acompanha arroz branco, couve refogada, farofa da casa e laranja.',
    preco: 45.90,
    categoria: 'Pratos',
    imagem: 'https://images.unsplash.com/photo-1590666610148-32363574972a?q=80&w=500',
    disponivel: true
  },
  {
    id: '2',
    nome: 'Frango com Quiabo',
    descricao: 'Tradicional frango caipira com quiabo fresquinho e polenta cremosa.',
    preco: 38.00,
    categoria: 'Pratos',
    imagem: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=500',
    disponivel: true
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
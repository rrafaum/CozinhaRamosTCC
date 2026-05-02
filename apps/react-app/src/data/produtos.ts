import type { Produto } from '@shared/types/Produto';
const API_URL = import.meta.env.VITE_API_URL;

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: '1',
    nome: 'Feijoada Completa',
    descricao: 'Acompanha arroz branco, couve refogada, farofa da casa e laranja.',
    preco: 45.90,
    categoria: 'Pratos',
    imagem: `${API_URL}/images/feijoada.jpg`,
    disponivel: true
  },
  {
    id: '2',
    nome: 'Frango com Quiabo',
    descricao: 'Tradicional frango caipira com quiabo fresquinho e polenta cremosa.',
    preco: 38.00,
    categoria: 'Pratos',
    imagem: `${API_URL}/images/frango-com-quiabo.jpg`,
    disponivel: false
  },
  {
    id: '3',
    nome: 'Suco de Laranja 500ml',
    descricao: 'Suco natural da fruta, gelado e sem açúcar adicionado.',
    preco: 12.00,
    categoria: 'Bebidas',
    imagem: `${API_URL}/images/suco-de-laranja.jpg`,
    disponivel: true
  },
  {
    id: '4',
    nome: 'Palha Italiana',
    descricao: 'Delicioso doce de brigadeiro gourmet com pedaços crocantes de biscoito.',
    preco: 5.00,
    categoria: 'Sobremesas',
    imagem: `${API_URL}/images/palha-italiana.jpg`,
    disponivel: true
  },
  {
    id: '5',
    nome: 'Coca Cola KS',
    descricao: 'Um refrigerante saboroso para qualquer momento.',
    preco: 7.00,
    categoria: 'Bebidas',
    imagem: `${API_URL}/images/coca-cola-ks.jpg`,
    disponivel: true
  },
  {
    id: '6',
    nome: 'Mousse de Maracujá',
    descricao: 'Feito da fruta com folhas de hortelã para dar frescor.',
    preco: 6.00,
    categoria: 'Sobremesas',
    imagem: `${API_URL}/images/mousse-de-maracuja.jpg`,
    disponivel: false
  }
];
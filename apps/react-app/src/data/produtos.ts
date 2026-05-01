import type { Produto } from '@shared/types/Produto';

import feijoadaImg from '../assets/images/feijoada.jpg';
import frangoImg from '../assets/images/frango-com-quiabo.jpg';
import sucoImg from '../assets/images/suco-de-laranja.jpg';
import palhaImg from '../assets/images/palha-italiana.jpg';
import cocaImg from '../assets/images/coca-cola-ks.jpg';
import mousseImg from '../assets/images/mousse-de-maracuja.jpg';

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: '1',
    nome: 'Feijoada Completa',
    descricao: 'Acompanha arroz branco, couve refogada, farofa da casa e laranja.',
    preco: 45.90,
    categoria: 'Pratos',
    imagem: feijoadaImg,
    disponivel: true
  },
  {
    id: '2',
    nome: 'Frango com Quiabo',
    descricao: 'Tradicional frango caipira com quiabo fresquinho e polenta cremosa.',
    preco: 38.00,
    categoria: 'Pratos',
    imagem: frangoImg,
    disponivel: false
  },
  {
    id: '3',
    nome: 'Suco de Laranja 500ml',
    descricao: 'Suco natural da fruta, gelado e sem açúcar adicionado.',
    preco: 12.00,
    categoria: 'Bebidas',
    imagem: sucoImg,
    disponivel: true
  },
  {
    id: '4',
    nome: 'Palha Italiana',
    descricao: 'Delicioso doce de brigadeiro gourmet com pedaços crocantes de biscoito.',
    preco: 5.00,
    categoria: 'Sobremesas',
    imagem: palhaImg,
    disponivel: true
  },
  {
    id: '5',
    nome: 'Coca Cola KS',
    descricao: 'Um refrigerante saboroso para qualquer momento.',
    preco: 7.00,
    categoria: 'Bebidas',
    imagem: cocaImg,
    disponivel: true
  },
  {
    id: '6',
    nome: 'Mousse de Maracujá',
    descricao: 'Feito da fruta com folhas de hortelã para dar frescor.',
    preco: 6.00,
    categoria: 'Sobremesas',
    imagem: mousseImg,
    disponivel: false
  }
];
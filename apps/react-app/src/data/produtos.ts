import type { Produto } from '@shared/types/Produto';

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: '1',
    nome: 'Feijoada Completa',
    descricao: 'Acompanha arroz branco, couve refogada, farofa da casa e laranja.',
    preco: 45.90,
    categoria: 'Pratos',
    imagem: 'https://receitasgourmetdavovo.com.br/wp-content/uploads/2022/05/feijoada-completa.jpg',
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
  },
  {
    id: '3',
    nome: 'Suco de Laranja 500ml',
    descricao: 'Suco natural da fruta, gelado e sem açúcar adicionado.',
    preco: 12.00,
    categoria: 'Bebidas',
    imagem: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=500',
    disponivel: true
  }
];
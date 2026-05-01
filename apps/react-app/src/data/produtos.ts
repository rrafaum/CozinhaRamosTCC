import type { Produto } from '@shared/types/Produto';

export const PRODUTOS_MOCK: Produto[] = [
  {
    id: '1',
    nome: 'Feijoada Completa',
    descricao: 'Acompanha arroz branco, couve refogada, farofa da casa e laranja.',
    preco: 45.90,
    categoria: 'Pratos',
    imagem: 'https://receitasgourmetdavovo.com.br/wp-content/uploads/2022/05/feijoada-completa.jpg?q=80&w=500',
    disponivel: true
  },
  {
    id: '2',
    nome: 'Frango com Quiabo',
    descricao: 'Tradicional frango caipira com quiabo fresquinho e polenta cremosa.',
    preco: 38.00,
    categoria: 'Pratos',
    imagem: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=500',
    disponivel: false
  },
  {
    id: '3',
    nome: 'Suco de Laranja 500ml',
    descricao: 'Suco natural da fruta, gelado e sem açúcar adicionado.',
    preco: 12.00,
    categoria: 'Bebidas',
    imagem: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=500',
    disponivel: true
  },
  {
    id: '4',
    nome: 'Palha Italiana',
    descricao: 'Delicioso doce de brigadeiro gourmet com pedaços crocantes de biscoito.',
    preco: 5.00,
    categoria: 'Sobremesas',
    imagem: 'https://coisasdeterezinha.com.br/wordpress/wp-content/files/coisasdeterezinha.com.br/2024/04/palha-italiana-nao-commons.jpg?q=80&w=500',
    disponivel: true
  },
  {
    id: '5',
    nome: 'Coca Cola KS',
    descricao: 'Um refrigerante saboroso para qualquer momento.',
    preco: 7.00,
    categoria: 'Bebidas',
    imagem: 'https://www.thedailymeal.com/img/gallery/the-inspiration-behind-the-shape-of-coca-colas-iconic-original-bottle/l-intro-1672949640.jpg?q=80&w=500',
    disponivel: true
  },
  {
    id: '6',
    nome: 'Mousse de Maracujá',
    descricao: 'Feito da fruta com folhas de hortelã para dar frescor.',
    preco: 6.00,
    categoria: 'Sobremesas',
    imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/99552797e1630f1fc706d3714ba75745_XL.jpg?q=80&w=500',
    disponivel: false
  }
];
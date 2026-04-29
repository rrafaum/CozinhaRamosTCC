export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: 'Pratos' | 'Bebidas' | 'Sobremesas';
  imagem: string;
  disponivel: boolean;
}

export interface ItemCarrinho extends Produto {
  quantidade: number;
}
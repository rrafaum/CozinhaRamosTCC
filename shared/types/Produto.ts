export interface Produto {
  id: string; 
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  imagem: string;
  disponivel: boolean;
}
export interface ItemCarrinho extends Produto {
  quantidade: number;
}

export interface Pedido {
  cliente: string;
  itens: { produtoId: string; quantidade: number }[];
  total: number;
  data: Date;
}
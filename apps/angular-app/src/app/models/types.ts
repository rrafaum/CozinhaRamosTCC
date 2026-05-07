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

export interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  token?: string;
}

import { Plus } from 'lucide-react';
import type { Produto } from '@shared/types/Produto';

interface CardProdutoProps {
  produto: Produto;
  onAdd: (p: Produto) => void;
}

export default function CardProduto({ produto, onAdd }: CardProdutoProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-ramos-bege-escuro/30 hover:shadow-md transition-shadow">
      <img 
        src={produto.imagem} 
        alt={produto.nome} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-ramos-verde leading-tight">{produto.nome}</h3>
          <span className="font-bold text-ramos-marrom">
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{produto.descricao}</p>
        
        <button 
          onClick={() => onAdd(produto)}
          className="w-full bg-ramos-verde text-ramos-bege py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 active:scale-95 transition-all"
        >
          <Plus size={20} />
          Adicionar
        </button>
      </div>
    </div>
  );
}
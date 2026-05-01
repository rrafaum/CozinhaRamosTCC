import { Plus, Info } from 'lucide-react';
import type { Produto } from '@shared/types/Produto';

interface CardProdutoProps {
  produto: Produto;
  onAdd: (p: Produto) => void;
}

export default function CardProduto({ produto, onAdd }: CardProdutoProps) {
  return (
    <div className={`relative bg-white rounded-2xl shadow-sm overflow-hidden border border-ramos-bege-escuro/30 hover:shadow-md transition-shadow ${!produto.disponivel ? 'opacity-60' : ''}`}>
      
      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-ramos-verde text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm uppercase tracking-wider border border-ramos-bege-escuro/20">
        {produto.categoria}
      </span>

      <img 
        src={produto.imagem} 
        alt={produto.nome} 
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-ramos-verde leading-tight">{produto.nome}</h3>
          <span className="font-bold text-ramos-marrom whitespace-nowrap ml-2">
            R$ {produto.preco.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{produto.descricao}</p>
        
        <button 
          onClick={() => onAdd(produto)}
          disabled={!produto.disponivel}
          className={`w-full py-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all 
            ${produto.disponivel 
              ? 'bg-ramos-verde text-ramos-bege hover:bg-opacity-90 active:scale-95' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          {produto.disponivel ? (
            <>
              <Plus size={20} />
              Adicionar
            </>
          ) : (
            <>
              <Info size={18} />
              Indisponível
            </>
          )}
        </button>
      </div>
    </div>
  );
}
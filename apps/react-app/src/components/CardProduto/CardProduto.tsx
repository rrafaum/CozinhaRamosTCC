import { Plus, Info } from 'lucide-react';
import type { Produto } from '@shared/types/Produto';
import './CardProduto.css';

interface CardProdutoProps {
  produto: Produto;
  onAdd: (p: Produto) => void;
}

export default function CardProduto({ produto, onAdd }: CardProdutoProps) {
  const { disponivel, categoria, imagem, nome, preco, descricao } = produto;

  return (
    <div className={`card-container ${!disponivel ? 'card-indisponivel' : ''}`}>
      
      <span className="card-badge">
        {categoria}
      </span>

      <img 
        src={imagem} 
        alt={nome} 
        className="card-image" 
      />

      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{nome}</h3>
          <span className="card-price">
            R$ {preco.toFixed(2).replace('.', ',')}
          </span>
        </div>
        
        <p className="card-description">{descricao}</p>
        
        <button 
          onClick={() => onAdd(produto)}
          disabled={!disponivel}
          className={`card-button ${disponivel ? 'card-button-active' : 'card-button-disabled'}`}
        >
          {disponivel ? (
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
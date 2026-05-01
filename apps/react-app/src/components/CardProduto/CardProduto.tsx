import { Icons } from '../Icons';
import type { Produto } from '@shared/types/Produto';
import './CardProduto.css';

interface CardProdutoProps {
  produto: Produto;
  onAdd: (p: Produto) => void;
}

export default function CardProduto({ produto, onAdd }: CardProdutoProps) {
  const { disponivel, categoria, imagem, nome, preco, descricao } = produto;

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(preco);

  return (
    <div className={`card-container ${!disponivel ? 'card-indisponivel' : ''}`}>
      
      <span className="card-badge">
        {categoria}
      </span>

      <img 
        src={imagem} 
        alt={`Imagem do produto ${nome}`} 
        className="card-image"
        loading="lazy"
      />

      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{nome}</h3>
          <span className="card-price">
            {precoFormatado}
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
              <Icons.Plus size={20} />
              Adicionar
            </>
          ) : (
            <>
              <Icons.Info size={18} />
              Indisponível
            </>
          )}
        </button>
      </div>
    </div>
  );
}
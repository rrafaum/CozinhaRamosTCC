import { Icons } from '../Icons';
import type { ItemCarrinho } from '@shared/types/Produto';
import { CONFIG } from '@shared/constants/config';
import './CarrinhoModal.css';

interface CarrinhoModalProps {
  itens: ItemCarrinho[];
  onFechar: () => void;
  onRemover: (id: string) => void;
  onAtualizarQtd: (id: string, delta: number) => void;
  onFinalizar: () => void;
}

export default function CarrinhoModal({ 
  itens, 
  onFechar, 
  onRemover, 
  onAtualizarQtd, 
  onFinalizar 
}: CarrinhoModalProps) {
  
  const moneyFormatter = new Intl.NumberFormat(CONFIG.CURRENCY.LOCALE, {
    style: 'currency',
    currency: CONFIG.CURRENCY.CODE,
  });

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const finalizarPedido = () => {
    let mensagem = `*Novo Pedido - ${CONFIG.APP.NAME}*\n\n`;
    
    itens.forEach(item => {
      const subtotal = moneyFormatter.format(item.preco * item.quantidade);
      mensagem += `${item.quantidade}x ${item.nome} - ${subtotal}\n`;
    });

    mensagem += `\n*Total: ${moneyFormatter.format(total)}*`;
    
    const url = `https://wa.me/${CONFIG.CONTACT.WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank', 'noopener,noreferrer');

    onFinalizar();
  };

  const handleAtualizarQtd = (item: ItemCarrinho, delta: number) => {
    if (item.quantidade + delta <= 0) {
      onRemover(item.id);
    } else {
      onAtualizarQtd(item.id, delta);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-in slide-in-from-right duration-300">
        <div className="modal-header">
          <h2 className="modal-title">Seu Pedido</h2>
          <button 
            onClick={onFechar} 
            className="btn-close"
            aria-label="Fechar carrinho"
          >
            <Icons.Close size={24} />
          </button>
        </div>

        <div className="cart-items-container">
          {itens.length === 0 ? (
            <div className="text-center mt-10">
              <p className="cart-empty-text mb-4">Seu carrinho está vazio.</p>
              <button 
                onClick={onFechar} 
                className="text-ramos-verde font-bold underline cursor-pointer hover:text-ramos-marrom transition-colors"
              >
                Voltar ao cardápio
              </button>
            </div>
          ) : (
            itens.map(item => (
              <div key={item.id} className="cart-item-card">
                <img 
                  src={item.imagem} 
                  className="cart-item-image" 
                  alt={`Imagem de ${item.nome}`} 
                />
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.nome}</h4>
                  <p className="cart-item-price">{moneyFormatter.format(item.preco)}</p>
                  
                  <div className="qty-controls">
                    <button 
                      onClick={() => handleAtualizarQtd(item, -1)}
                      className="btn-qty"
                      aria-label="Diminuir quantidade"
                    >-</button>
                    <span className="qty-display">{item.quantidade}</span>
                    <button 
                      onClick={() => handleAtualizarQtd(item, 1)}
                      className="btn-qty"
                      aria-label="Aumentar quantidade"
                    >+</button>
                  </div>
                </div>
                <button 
                  onClick={() => onRemover(item.id)} 
                  className="btn-remove"
                  aria-label="Remover item"
                >
                  <Icons.Trash size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {itens.length > 0 && (
          <div className="modal-footer">
            <div className="total-container">
              <span>Total:</span>
              <span>{moneyFormatter.format(total)}</span>
            </div>
            <button 
              onClick={finalizarPedido}
              className="btn-checkout"
            >
              <Icons.WhatsApp size={24} />
              Enviar para o WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
import { X, Trash2, MessageCircle } from 'lucide-react';
import type { ItemCarrinho } from '@shared/types/Produto';
import './CarrinhoModal.css';

interface CarrinhoModalProps {
  itens: ItemCarrinho[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

export default function CarrinhoModal({ itens, onClose, onRemove, onUpdateQty }: CarrinhoModalProps) {
  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const finalizarPedido = () => {
    const numeroWhatsApp = "559999999999";
    let mensagem = `*Novo Pedido - Cozinha Ramos*\n\n`;
    
    itens.forEach(item => {
      mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });

    mensagem += `\n*Total: R$ ${total.toFixed(2).replace('.', ',')}*`;
    
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-in slide-in-from-right duration-300">
        <div className="modal-header">
          <h2 className="modal-title">Seu Pedido</h2>
          <button onClick={onClose} className="btn-close">
            <X size={24} />
          </button>
        </div>

        <div className="cart-items-container">
          {itens.length === 0 ? (
            <p className="cart-empty-text">Seu carrinho está vazio.</p>
          ) : (
            itens.map(item => (
              <div key={item.id} className="cart-item-card">
                <img src={item.imagem} className="cart-item-image" alt={item.nome} />
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.nome}</h4>
                  <p className="cart-item-price">R$ {item.preco.toFixed(2)}</p>
                  
                  <div className="qty-controls">
                    <button 
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="btn-qty"
                    >-</button>
                    <span className="qty-display">{item.quantidade}</span>
                    <button 
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="btn-qty"
                    >+</button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="btn-remove">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {itens.length > 0 && (
          <div className="modal-footer">
            <div className="total-container">
              <span>Total:</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <button 
              onClick={finalizarPedido}
              className="btn-checkout"
            >
              <MessageCircle size={24} />
              Enviar para o WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
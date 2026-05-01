import { X, Trash2, MessageCircle } from 'lucide-react';
import type { ItemCarrinho } from '@shared/types/Produto';

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
    <div className="fixed inset-0 bg-black/50 z-60 flex justify-end">
      <div className="bg-ramos-bege w-full max-w-md h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-right">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-ramos-verde">Seu Pedido</h2>
          <button onClick={onClose} className="p-2 hover:bg-ramos-bege-escuro rounded-full transition">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {itens.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Seu carrinho está vazio.</p>
          ) : (
            itens.map(item => (
              <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-ramos-bege-escuro/20">
                <img src={item.imagem} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-ramos-verde text-sm">{item.nome}</h4>
                  <p className="text-ramos-marrom font-semibold text-xs">R$ {item.preco.toFixed(2)}</p>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-6 h-6 border border-ramos-marrom text-ramos-marrom rounded flex items-center justify-center"
                    >-</button>
                    <span className="text-sm font-bold">{item.quantidade}</span>
                    <button 
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-6 h-6 border border-ramos-marrom text-ramos-marrom rounded flex items-center justify-center"
                    >+</button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-500 self-center p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {itens.length > 0 && (
          <div className="border-t border-ramos-bege-escuro pt-6 mt-4">
            <div className="flex justify-between items-center mb-6 text-xl font-bold text-ramos-verde">
              <span>Total:</span>
              <span>R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <button 
              onClick={finalizarPedido}
              className="w-full bg-ramos-verde text-ramos-bege py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-opacity-95 transition-all shadow-lg"
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
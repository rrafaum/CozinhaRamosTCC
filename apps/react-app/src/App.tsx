import { useState } from 'react';
import Header from './components/Header';
import CardProduto from './components/CardProduto';
import { PRODUTOS_MOCK } from './data/produtos';
import type { ItemCarrinho, Produto } from '@shared/types/Produto';

export default function App() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho(prev => {
      const itemExiste = prev.find(item => item.id === produto.id);
      if (itemExiste) {
        return prev.map(item => 
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="min-h-screen pb-20">
      <Header quantidadeCarrinho={totalItens} />
      
      <section className="bg-ramos-verde text-ramos-bege py-10 px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Cozinha Ramos</h2>
        <p className="text-ramos-bege-escuro italic">O melhor da comida caseira na sua porta.</p>
      </section>

      <main className="container mx-auto p-4 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-ramos-verde">Nosso Cardápio</h3>
          <div className="flex gap-2">
             <span className="bg-ramos-marrom text-white px-3 py-1 rounded-full text-xs font-bold">ENTREGA</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUTOS_MOCK.map(produto => (
            <CardProduto 
              key={produto.id} 
              produto={produto} 
              onAdd={adicionarAoCarrinho} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}
import { useState } from 'react';
import Header from './components/Header';
import CardProduto from './components/CardProduto';
import CarrinhoModal from './components/CarrinhoModal';
import { PRODUTOS_MOCK } from './data/produtos';
import type { ItemCarrinho, Produto } from '@shared/types/Produto';

export default function App() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [isCarrinhoAberto, setIsCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState<'Todos' | 'Pratos' | 'Bebidas' | 'Sobremesas'>('Todos');

  const produtosFiltrados = categoriaAtiva === 'Todos' 
    ? PRODUTOS_MOCK 
    : PRODUTOS_MOCK.filter(p => p.categoria === categoriaAtiva);
  
  const categorias = ['Todos', 'Pratos', 'Bebidas', 'Sobremesas'] as const;
    
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
    setIsCarrinhoAberto(true);
  };

  const removerDoCarrinho = (id: string) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const atualizarQuantidade = (id: string, delta: number) => {
    setCarrinho(prev => prev.map(item => {
      if (item.id === id) {
        const novaQtd = item.quantidade + delta;
        return { ...item, quantidade: novaQtd > 0 ? novaQtd : 1 };
      }
      return item;
    }));
  };

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      <Header quantidadeCarrinho={totalItens} onCarrinhoAberto={() => setIsCarrinhoAberto(true)} />
      
      <section className="bg-ramos-verde text-ramos-bege py-10 px-4 text-center shadow-inner">
        <h2 className="text-3xl font-bold mb-2">Cozinha Ramos</h2>
        <p className="text-ramos-bege-escuro italic">Tradição e sabor que chegam até você.</p>
      </section>

      <main className="container mx-auto p-4 max-w-5xl">
        {/* Filtros de Categoria */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap border
                ${categoriaAtiva === cat 
                  ? 'bg-ramos-marrom text-white border-ramos-marrom shadow-md' 
                  : 'bg-white text-ramos-verde border-ramos-bege-escuro/30 hover:bg-ramos-bege'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Título da Seção */}
        <div className="flex items-center justify-between mb-8 border-b border-ramos-bege-escuro/30 pb-2">
          <h3 className="text-2xl font-bold text-ramos-verde">Nosso Cardápio</h3>
          <span className="bg-ramos-marrom text-white px-3 py-1 rounded-full text-xs font-bold">ENTREGA</span>
        </div>

        {/* Grid de Produtos Filtrados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {produtosFiltrados.map(produto => (
            <CardProduto 
              key={produto.id} 
              produto={produto} 
              onAdd={adicionarAoCarrinho} 
            />
          ))}
        </div>
      </main>

      {isCarrinhoAberto && (
        <CarrinhoModal 
          itens={carrinho} 
          onClose={() => setIsCarrinhoAberto(false)}
          onRemove={removerDoCarrinho}
          onUpdateQty={atualizarQuantidade}
        />
      )}
    </div>
  );
}
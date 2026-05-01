import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CardProduto from './components/CardProduto/CardProduto';
import CarrinhoModal from './components/CarrinhoModal/CarrinhoModal';
import { PRODUTOS_MOCK } from './data/produtos';
import type { ItemCarrinho, Produto } from '@shared/types/Produto';
import './App.css';

export default function App() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(() => {
    const salvo = localStorage.getItem('@CozinhaRamos:carrinho');
    return salvo ? JSON.parse(salvo) : [];
  });
  const [isCarrinhoAberto, setIsCarrinhoAberto] = useState(false);
  const limparCarrinho = () => {setCarrinho([]); setIsCarrinhoAberto(false);};

  useEffect(() => {
    localStorage.setItem('@CozinhaRamos:carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const [categoriaAtiva, setCategoriaAtiva] = useState<'Todos' | 'Pratos' | 'Bebidas' | 'Sobremesas'>('Todos');
  const categorias = ['Todos', 'Pratos', 'Bebidas', 'Sobremesas'] as const;

  const produtosFiltrados = categoriaAtiva === 'Todos' 
    ? PRODUTOS_MOCK 
    : PRODUTOS_MOCK.filter(p => p.categoria === categoriaAtiva);
  
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

  const [isCarregando, setIsCarregando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCarregando(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-wrapper">
      <Header 
        quantidadeCarrinho={totalItens} 
        onCarrinhoAberto={() => setIsCarrinhoAberto(true)} 
      />
      
      <section className="hero-banner">
        <h2 className="hero-title">Cozinha Ramos</h2>
        <p className="hero-subtitle">Tradição e sabor que chegam até você.</p>
      </section>

      <main className="main-content">
        {/* Filtros de Categoria */}
        <div className="filter-container">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`btn-filter ${categoriaAtiva === cat ? 'btn-filter-active' : 'btn-filter-inactive'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Título da Seção */}
        <div className="section-header">
          <h3 className="section-title">Nosso Cardápio</h3>
          <span className="delivery-badge">ENTREGA</span>
        </div>

        {/* Grid de Produtos */}
        <div className="product-grid">
          {isCarregando ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton skeleton-card" />
            ))
          ) : produtosFiltrados.map(produto => (
            <CardProduto 
              key={produto.id} 
              produto={produto} 
              onAdd={adicionarAoCarrinho} 
            />
          ))}
        </div>
      </main>

      <Footer />

      {isCarrinhoAberto && (
        <CarrinhoModal 
          itens={carrinho} 
          onFechar={() => setIsCarrinhoAberto(false)}
          onRemover={removerDoCarrinho}
          onAtualizarQtd={atualizarQuantidade}
          onFinalizar={limparCarrinho}
        />
      )}
    </div>
  );
}
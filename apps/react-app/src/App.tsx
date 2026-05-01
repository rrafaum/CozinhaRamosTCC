import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CardProduto from './components/CardProduto/CardProduto';
import CarrinhoModal from './components/CarrinhoModal/CarrinhoModal';

import { CONFIG } from '@shared/constants/config';
import { PRODUTOS_MOCK } from './data/produtos';
import type { ItemCarrinho, Produto } from '@shared/types/Produto';

import './App.css';

export default function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isCarrinhoAberto, setIsCarrinhoAberto] = useState(false);
  const [isCarregando, setIsCarregando] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(() => {
    try {
      const dadosSalvos = localStorage.getItem(CONFIG.STORAGE.CART_KEY);
      return dadosSalvos ? JSON.parse(dadosSalvos) : [];
    } catch (error) {
      console.error("Erro ao carregar localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        setIsCarregando(true);
        const response = await axios.get<Produto[]>('http://localhost:3001/produtos');
        
        if (response.data && response.data.length > 0) {
          setProdutos(response.data);
        } else {
          setProdutos(PRODUTOS_MOCK);
        }
      } catch (err) {
        console.error("API Offline. Usando dados locais (MOCK):", err);
        setProdutos(PRODUTOS_MOCK);
      } finally {
        setIsCarregando(false);
      }
    };

    buscarProdutos();
  }, []);
  
  const categorias = useMemo(() => {
    return ['Todos', ...new Set(produtos.map(p => p.categoria))];
  }, [produtos]);

  const totalItens = useMemo(() => {
    return carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }, [carrinho]);

  const produtosFiltrados = useMemo(() => {
    return categoriaAtiva === 'Todos' 
      ? produtos 
      : produtos.filter(p => p.categoria === categoriaAtiva);
  }, [categoriaAtiva, produtos]);
  
  useEffect(() => {
    localStorage.setItem(CONFIG.STORAGE.CART_KEY, JSON.stringify(carrinho));
  }, [carrinho]);

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

  const removerDoCarrinho = (id: string) => {
    setCarrinho(prev => prev.filter(item => item.id !== id));
  };

  const atualizarQuantidade = (id: string, delta: number) => {
    setCarrinho(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const novaQtd = item.quantidade + delta;
            return novaQtd > 0 ? { ...item, quantidade: novaQtd } : null;
          }
          return item;
        })
        .filter((item): item is ItemCarrinho => item !== null);
    });
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    setIsCarrinhoAberto(false);
  };

  return (
    <div className="app-wrapper">
      <Header 
        quantidadeCarrinho={totalItens} 
        onCarrinhoAberto={() => setIsCarrinhoAberto(true)} 
      />
      
      <section className="hero-banner">
        <h2 className="hero-title">{CONFIG.APP.NAME}</h2>
        <p className="hero-subtitle">{CONFIG.APP.SLOGAN}</p>
      </section>

      <main className="main-content">
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

        <div className="section-header">
          <h3 className="section-title">Nosso Cardápio</h3>
          <span className="delivery-badge">ENTREGA</span>
        </div>

        <div className="product-grid">
          {isCarregando ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton skeleton-card" />
            ))
          ) : produtosFiltrados.length > 0 ? (
            produtosFiltrados.map(produto => (
              <CardProduto 
                key={produto.id} 
                produto={produto} 
                onAdd={adicionarAoCarrinho} 
              />
            ))
          ) : (
            <div className="empty-state">
              <p>Nenhum produto disponível no momento.</p>
            </div>
          )}
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
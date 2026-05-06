import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import Login from './pages/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CardProduto from './components/CardProduto/CardProduto';
import CarrinhoModal from './components/CarrinhoModal/CarrinhoModal';

import { CONFIG } from '@shared/constants/config';
import type { ItemCarrinho, Produto } from '@shared/types/Produto';

import { Toaster, toast } from 'react-hot-toast';

import './App.css';

interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  token?: string;
}

export default function App() {
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(() => {
  const salvo = localStorage.getItem('@CozinhaRamos:usuario');
    return salvo ? JSON.parse(salvo) : null;
  });
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
    if (!usuario) return;

    const buscarProdutos = async () => {
      try {
        setIsCarregando(true);
        const response = await axios.get<Produto[]>(`${import.meta.env.VITE_API_URL}/produtos`);
        
        if (response.data && response.data.length > 0) {
          setProdutos(response.data);
        }
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        toast.error("Não foi possível carregar o cardápio.");
      } finally {
        setIsCarregando(false);
      }
    };

    buscarProdutos();
  }, [usuario]);

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

  const handleSucessoLogin = (userData: UsuarioLogado) => {
    setUsuario(userData);
    localStorage.setItem('@CozinhaRamos:usuario', JSON.stringify(userData));
    toast.success(`Bem-vindo, ${userData.nome}!`);
  };

  const handleSair = () => {
    setUsuario(null);
    localStorage.removeItem('@CozinhaRamos:usuario');
    toast.success("Sessão encerrada!");
  };

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

    toast.success(`${produto.nome} adicionado!`);
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

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] py-20">
        <Toaster />
        <div className="text-center mb-8">
           <h1 className="text-4xl font-bold text-[#435B17]">Cozinha Ramos</h1>
        </div>
        <Login onLoginSuccess={handleSucessoLogin} />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Header 
        quantidadeCarrinho={totalItens} 
        onCarrinhoAberto={() => setIsCarrinhoAberto(true)}
        onSair={handleSair}
        usuarioNome={usuario?.nome} 
      />

      <Toaster />
      
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
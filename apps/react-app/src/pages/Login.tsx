import React, { useState } from 'react';
import axios from 'axios';
import { Icons } from '../components/Icons';

interface UsuarioLogado {
  id: string;
  nome: string;
  email: string;
  token?: string;
}

interface LoginProps {
  onLoginSuccess: (userData: UsuarioLogado) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isLogin 
      ? `${import.meta.env.VITE_API_URL}/auth/login` 
      : `${import.meta.env.VITE_API_URL}/auth/register`;
    
    const payload = isLogin ? { email, senha } : { nome, email, senha };

    try {
      const { data } = await axios.post<UsuarioLogado>(url, payload);
      onLoginSuccess(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao processar. Tente novamente.');
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#435B17]">
          {isLogin ? 'Bem-vindo de volta!' : 'Criar Conta'}
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          {isLogin ? 'Acesse para fazer seus pedidos' : 'Cadastre-se na Cozinha Ramos'}
        </p>
      </div>

      <form onSubmit={handleEnviar} className="space-y-4">
        {!isLogin && (
          <div className="relative">
            <Icons.User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Nome completo"
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#435B17] outline-none"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
        )}

        <div className="relative">
          <Icons.Email className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#435B17] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Icons.Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Sua senha (mín. 6 caracteres)"
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-[#435B17] outline-none"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {error && <p className="text-red-500 text-xs italic">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#435B17] text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition flex justify-center items-center gap-2"
        >
          {loading ? <Icons.Loader className="animate-spin" /> : isLogin ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="w-full mt-4 text-gray-600 text-sm font-semibold hover:underline"
      >
        {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre aqui'}
      </button>
    </div>
  );
}
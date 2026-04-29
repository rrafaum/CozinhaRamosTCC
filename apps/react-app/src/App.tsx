import type { Produto } from '@shared/types/Produto';

function App() {
  const produtoExemplo: Produto = {
    id: '1',
    nome: 'Feijoada Ramos',
    descricao: 'A melhor da região',
    preco: 45.90,
    categoria: 'Pratos',
    imagem: '',
    disponivel: true
  };

  return (
    <div className="min-h-screen bg-ramos-bege p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-ramos-verde mb-4">
        Cozinha Ramos - TCC
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-ramos-marrom">
        <h2 className="text-2xl text-ramos-marrom font-semibold">
          {produtoExemplo.nome}
        </h2>
        <p className="text-gray-600 italic">{produtoExemplo.descricao}</p>
        <p className="mt-4 font-bold text-xl text-ramos-verde">
          R$ {produtoExemplo.preco.toFixed(2)}
        </p>
      </div>

      <p className="mt-8 text-sm text-ramos-bege-escuro">
        Framework: React + TypeScript + Tailwind v4
      </p>
    </div>
  );
}

export default App;
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen">
      <Header cartCount={3} />
      <main className="container mx-auto p-4 text-center mt-10">
        <h2 className="text-3xl font-bold text-ramos-verde">Bem-vindo à Cozinha Ramos</h2>
        <p className="text-ramos-marrom mt-2">O projeto começa aqui!</p>
      </main>
    </div>
  )
}

export default App
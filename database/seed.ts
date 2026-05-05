const mongoose = require('mongoose');
const path = require('path');

const { Produto } = require(path.resolve(__dirname, '../backend/src/models/Produto'));

async function runSeed() {
  console.log('🚀 Script seed iniciado...');
  
  try {
    console.log('🏁 Iniciando conexão direta com o MongoDB...');
    
    const connection = await mongoose.createConnection('mongodb://127.0.0.1:27017/cozinharamos').asPromise();
    console.log('🍃 MongoDB Conectado!');

    const ProdutoModel = connection.model('Produto', Produto.schema);

    console.log('🧹 Limpando dados antigos...');
    await ProdutoModel.deleteMany({});
    console.log('✅ Banco limpo!');

    const PRODUTOS_PARA_SEED = [
      { nome: 'Feijoada Completa', descricao: 'Acompanha arroz branco, couve refogada, farofa da casa e laranja.', preco: 45.9, categoria: 'Pratos', imagem: 'http://localhost:3001/images/feijoada.jpg', disponivel: true },
      { nome: 'Frango com Quiabo', descricao: 'Tradicional frango caipira com quiabo fresquinho e polenta cremosa.', preco: 38.0, categoria: 'Pratos', imagem: 'http://localhost:3001/images/frango-com-quiabo.jpg', disponivel: true },
      { nome: 'Suco de Laranja 500ml', descricao: 'Suco natural da fruta, gelado e sem açúcar adicionado.', preco: 12.0, categoria: 'Bebidas', imagem: 'http://localhost:3001/images/suco-de-laranja.jpg', disponivel: true },
      { nome: 'Palha Italiana', descricao: 'Delicioso doce de brigadeiro gourmet com pedaços crocantes de biscoito.', preco: 5.0, categoria: 'Sobremesas', imagem: 'http://localhost:3001/images/palha-italiana.jpg', disponivel: true },
      { nome: 'Coca Cola KS', descricao: 'Um refrigerante saboroso para qualquer momento.', preco: 7.0, categoria: 'Bebidas', imagem: 'http://localhost:3001/images/coca-cola-ks.jpg', disponivel: true },
      { nome: 'Mousse de Maracujá', descricao: 'Feito da fruta com folhas de hortelã para dar frescor.', preco: 6.0, categoria: 'Sobremesas', imagem: 'http://localhost:3001/images/mousse-de-maracuja.jpg', disponivel: true }
    ];

    console.log('📦 Inserindo novos produtos...');
    await ProdutoModel.insertMany(PRODUTOS_PARA_SEED);
    
    console.log('✅ Banco populado com sucesso!');
    
    await connection.close();
    process.exit(0);
  } catch (err: any) {
    console.error('❌ ERRO NO SEED:', err.message || err);
    process.exit(1);
  }
}

runSeed();
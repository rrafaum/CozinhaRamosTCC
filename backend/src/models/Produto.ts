import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: Number, required: true },
  categoria: { type: String, required: true },
  imagem: { type: String, required: true },
  disponivel: { type: Boolean, default: true }
});

export const Produto = model('Produto', productSchema);
import { Schema, model } from 'mongoose';

const pedidoSchema = new Schema({
  usuarioId: { type: String, required: true },
  itens: [
    {
      produtoId: String,
      nome: String,
      quantidade: Number,
      preco: Number
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'pendente' },
  criadoEm: { type: Date, default: Date.now }
});

export const Pedido = model('Pedido', pedidoSchema);
import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
  nome: { type: String, required: [true, 'Nome é obrigatório'], trim: true },
  email: { type: String, required: [true, 'Email é obrigatório'], unique: true, lowercase: true, trim: true },
  senha: { type: String, required: [true, 'Senha é obrigatória'], minlength: 6 },
  criadoEm: { type: Date, default: Date.now }
});

export const Usuario = model('Usuario', usuarioSchema, 'usuarios');
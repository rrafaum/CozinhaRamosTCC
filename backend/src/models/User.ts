import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  nome: { type: String, required: [true, 'Nome é obrigatório'] },
  email: { type: String, required: [true, 'Email é obrigatório'], unique: true, lowercase: true },
  senha: { type: String, required: [true, 'Senha é obrigatória'], minlength: 6 },
  criadoEm: { type: Date, default: Date.now }
});

export const User = model('User', userSchema);
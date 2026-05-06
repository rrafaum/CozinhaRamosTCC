import { Router } from 'express';
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: 'Preencha todos os campos' });

    const salt = await bcrypt.genSalt(10);
    const senhaCripto = await bcrypt.hash(senha, salt);

    const novo = await Usuario.create({ nome, email, senha: senhaCripto });
    res.status(201).json({ id: novo._id, nome: novo.nome });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao cadastrar. Email já existe.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'Dados inválidos' });

    const usuario = await Usuario.findOne({ email });
    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      return res.json({ id: usuario._id, nome: usuario.nome, token: "fake-jwt" });
    }
    return res.status(401).json({ error: 'Credenciais inválidas' });
  } catch (err) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

export default router;
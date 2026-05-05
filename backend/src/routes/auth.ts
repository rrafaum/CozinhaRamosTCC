import { Router } from 'express';
import { Usuario } from '../models/Usuario';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha || senha.length < 6) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }
    const salt = await bcrypt.genSalt(10);
    const senhaCripto = await bcrypt.hash(senha, salt);
    const novoUsuario = await Usuario.create({ nome, email, senha: senhaCripto });
    res.status(201).json({ id: novoUsuario._id, nome: novoUsuario.nome });
  } catch (err) {
    res.status(400).json({ error: 'Email já cadastrado.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
    res.json({ id: usuario._id, nome: usuario.nome, token: "fake-jwt-token" });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

export default router;
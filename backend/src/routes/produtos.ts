import { Router } from 'express';
import { Produto } from '../models/Produto';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find({});
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos no banco.' });
  }
});

export default router;
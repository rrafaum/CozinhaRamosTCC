import { Router } from 'express';
import { Pedido } from '../models/Pedido';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { usuarioId, itens, total } = req.body;
    if (!itens || itens.length === 0) return res.status(400).json({ error: 'Carrinho vazio' });

    const novoPedido = await Pedido.create({ usuarioId, itens, total });
    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar pedido' });
  }
});

export default router;
import express from 'express';
import Click from '../models/Click.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL é obrigatória' });
    
    try {
        await Click.create({ url });
        res.json({ success: true, message: 'Clique registrado' });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});
export default router;
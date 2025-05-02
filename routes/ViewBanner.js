import express from 'express';
import ViewBanner from '../models/ViewBanner.js';
import Click from '../models/Click.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { idBanner } = req.body;
    if (!idBanner) return res.status(400).json({ error: 'x874' });
    try {
        await ViewBanner.create({ idBanner });
        res.json({ success: true});
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

router.get('/:idBanner',auth, async (req, res,) => {
    try {
      const total = await ViewBanner.countDocuments({ idBanner: req.params.idBanner });
      res.send({ total });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar banner', error });
    }
});

router.get('/clicks/',auth, async (req, res,) => {
  const { paramUrl } = req.body;
    try {
      const urlPattern = new RegExp(paramUrl.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
      const total = await Click.countDocuments({ url: { $regex: urlPattern } });
      res.send({ total });
    } catch (error) {
      res.status(500).send({ message: 'Erro ao buscar banner', error });
    }
});

export default router;
import express from 'express';
import BannerLocation from '../models/BannerLocation.js';
import Banner from '../models/Banner.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const { location_area } = req.body;

    const bannerLocation = new BannerLocation({
      location_area,
    });

    await bannerLocation.save();
    res.status(201).send(bannerLocation);
  } catch (error) {
    res.status(400).send({ message: 'Erro ao criar local de banner', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const bannerLocations = await BannerLocation.find();
    res.send(bannerLocations);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar locais de banner', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bannerLocation = await BannerLocation.findById(req.params.id);
    if (!bannerLocation) {
      return res.status(404).send({ message: 'Local de banner não encontrado' });
    }

    const banners = await Banner.find({ banner_location: req.params.id });
    res.send({ bannerLocation, banners });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar local de banner e seus banners', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { location_area } = req.body;

    const bannerLocation = await BannerLocation.findByIdAndUpdate(
      req.params.id,
      { location_area },
      { new: true } // Retorna o local de banner atualizado
    );

    if (!bannerLocation) {
      return res.status(404).send({ message: 'Local de banner não encontrado' });
    }

    res.send(bannerLocation);
  } catch (error) {
    res.status(400).send({ message: 'Erro ao atualizar local de banner', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const bannerLocation = await BannerLocation.findByIdAndDelete(req.params.id);
    if (!bannerLocation) {
      return res.status(404).send({ message: 'Local de banner não encontrado' });
    }
    res.send({ message: 'Local de banner deletado com sucesso' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao deletar local de banner', error });
  }
});

export default router;
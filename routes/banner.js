import express from 'express';
import Banner from '../models/Banner.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  try {
    const { banner_name, imagem_desktop, imagem_mobile, data_start, data_end, link, tag_google, tag_active, banner_location } = req.body;

    const banner = new Banner({
      banner_name,
      imagem_desktop,
      imagem_mobile,
      data_start,
      data_end,
      link,
      tag_google,
      tag_active,
      banner_location,
    });

    await banner.save();
    res.status(201).send(banner);
  } catch (error) {
    res.status(400).send({ message: 'Erro ao criar banner', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find().populate('banner_location');
    res.send(banners);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar banners', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id).populate('banner_location');
    if (!banner) {
      return res.status(404).send({ message: 'Banner não encontrado' });
    }
    res.send(banner);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar banner', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { banner_name, imagem_desktop, imagem_mobile, data_start, data_end, link, tag_google, tag_active, banner_location } = req.body;

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      {
        banner_name,
        imagem_desktop,
        imagem_mobile,
        data_start,
        data_end,
        link,
        tag_google,
        tag_active,
        banner_location,
      },
      { new: true } 
    );

    if (!banner) {
      return res.status(404).send({ message: 'Banner não encontrado' });
    }

    res.send(banner);
  } catch (error) {
    res.status(400).send({ message: 'Erro ao atualizar banner', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).send({ message: 'Banner não encontrado' });
    }
    res.send({ message: 'Banner deletado com sucesso' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao deletar banner', error });
  }
});

export default  router;
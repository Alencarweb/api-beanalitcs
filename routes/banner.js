import express from 'express';
import Banner from '../models/Banner.js';
import auth from '../middleware/auth.js';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

const router = express.Router();


const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const fileName = `${year}/${month}/${Date.now()}_${file.originalname}`;
      cb(null, `banners/${fileName}`);
    },
  }),
});


router.use(auth);

router.post('/', upload.fields([{ name: 'imagem_desktop' }, { name: 'imagem_mobile' }]), async (req, res) => {
  try {
    const { banner_name, data_start, data_end, link, tag_google, tag_active, banner_location } = req.body;
    const imagem_desktop = req.files.imagem_desktop ? req.files.imagem_desktop[0].location : null;
    const imagem_mobile = req.files.imagem_mobile ? req.files.imagem_mobile[0].location : null;

    const banner = new Banner({
      banner_name,
      imagem_desktop,
      imagem_mobile,
      data_start,
      data_end,
      link,
      tag_google,
      tag_active,
      banner_location:JSON.parse(banner_location),
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

router.put('/:id', upload.fields([{ name: 'imagem_desktop' }, { name: 'imagem_mobile' }]), async (req, res) => {
  try {
    const { banner_name, data_start, data_end, link, tag_google, tag_active, banner_location } = req.body;
    const imagem_desktop = req.files.imagem_desktop ? req.files.imagem_desktop[0].location : null;
    const imagem_mobile = req.files.imagem_mobile ? req.files.imagem_mobile[0].location : null;

    const updateData = {
      banner_name,
      data_start,
      data_end,
      link,
      tag_google,
      tag_active,
      banner_location: JSON.parse(banner_location), // Parse the banner_location to an array
    };

    if (imagem_desktop) updateData.imagem_desktop = imagem_desktop;
    if (imagem_mobile) updateData.imagem_mobile = imagem_mobile;

    const banner = await Banner.findByIdAndUpdate(req.params.id, updateData, { new: true });

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
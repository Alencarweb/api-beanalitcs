import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import useragent from 'useragent';
import clickRoutes from './routes/clickRoutes.js';
import accessRoutes from './routes/accessRoutes.js';

import bannerRoutes  from './routes/banner.js';
import bannerLocationRoutes  from './routes/bannerLocation.js';
import authRoutes from './routes/auth.js';

process.env.TZ = 'America/Sao_Paulo';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/urls', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// public
app.use('/auth', authRoutes);
app.use('/clicks', clickRoutes);
app.use('/access', accessRoutes); 
// private
app.use('/banners', bannerRoutes);
app.use('/locations', bannerLocationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

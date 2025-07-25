import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import useragent from 'useragent';
import clickRoutes from './routes/clickRoutes.js';
// import accessRoutes from './routes/accessRoutes.js';
import 'dotenv/config';
import bannerRoutes  from './routes/banner.js';
import bannerLocationRoutes  from './routes/bannerLocation.js';
import dashboardStats  from './routes/dashboardStats.js';
import authRoutes from './routes/auth.js';
import ViewBanner from './routes/ViewBanner.js';
import publicRoutes from './routes/publicRoutes.js';

const allowedOrigins = ['http://localhost:5173', 'https://outrodominixxxxo.com'];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); 
        } else {
            callback(new Error('Origem não autorizada')); 
        }
    }
};

process.env.TZ = 'America/Sao_Paulo';

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors(corsOptions));

mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// public
app.use('/auth', authRoutes);
app.use('/clicks', clickRoutes);
// app.use('/access', accessRoutes);
app.use('/view', ViewBanner);
app.use('/api/public', publicRoutes);
// private
app.use('/banners', bannerRoutes);
app.use('/locations', bannerLocationRoutes);
app.use('/dashboard', dashboardStats);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

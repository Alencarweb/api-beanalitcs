import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import useragent from 'useragent';
import clickRoutes from './routes/clickRoutes.js';
import accessRoutes from './routes/accessRoutes.js';

process.env.TZ = 'America/Sao_Paulo';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/urls', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/clicks', clickRoutes);
app.use('/access', accessRoutes); 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

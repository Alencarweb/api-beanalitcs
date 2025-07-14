// import express from 'express';
// import Access from '../models/Access.js';
// import useragent from 'useragent';

// const router = express.Router();

// router.post('/', async (req, res) => {
//     const { url, referrer } = req.body;
//     if (!url) return res.status(400).json({ error: 'URL é obrigatória' });

//     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
//     const userAgent = req.headers['user-agent'] || 'Unknown';
//     const agent = useragent.parse(userAgent);

//     const deviceInfo = {
//         browser: agent.family || 'Unknown',
//         os: agent.os.family || 'Unknown',
//         device: agent.device.family || 'Desktop',
//     };

//     try {
//         await Access.create({ url, referrer: referrer || 'Direct', ...deviceInfo, ip, userAgent });
//         res.json({ success: true, message: 'Acesso registrado' });
//     } catch (error) {
//         res.status(500).json({ error: 'Erro no servidor' });
//     }
// });

// export default router;
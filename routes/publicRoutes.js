import express from 'express';
const router = express.Router();
import BannerLocation from '../models/BannerLocation.js';
import Banner from '../models/Banner.js';

router.get('/banners-locations', async (req, res) => {
    try {
        const dataAtual = new Date();
        const locations = await BannerLocation.find().lean();
        const banners = await Banner.find({
            data_start: { $lte: dataAtual },
            data_end: { $gte: dataAtual }
        }).lean();

        const result = locations.map(location => {
            const associatedBanners = banners.filter(banner =>
                banner.banner_location.some(locId => locId.toString() === location._id.toString())
            );
            return {
                ...location,
                banners: associatedBanners,
            };
        });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar bannersLocation e banners.' });
    }
});

export default router;
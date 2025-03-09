import express from 'express';
import Access from '../models/Access.js';
import Click from '../models/Click.js'; 
import auth from '../middleware/auth.js';

const router = express.Router();
router.use(auth);

router.get('/access/stats', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const stats = await Access.aggregate([
      {
        $match: {
          accessedAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: '$url',
          count: { $sum: 1 },
        },
      },
    ]);

    res.send(stats);
  } catch (error) {
    console.error('Error fetching access stats:', error);
    res.status(500).send({ message: 'Erro no servidor' });
  }
});

router.get('/access/statsfull', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const statsFull = await Access.find({
      accessedAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.send(statsFull);
  } catch (error) {
    console.error('Error fetching full access stats:', error);
    res.status(500).send({ message: 'Erro no servidor' });
  }
});

router.get('/clicks/stats', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const stats = await Click.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: '$url',
          count: { $sum: 1 },
        },
      },
    ]);

    res.send(stats);
  } catch (error) {
    console.error('Error fetching click stats:', error);
    res.status(500).send({ message: 'Erro no servidor' });
  }
});

router.get('/clicks/statsfull', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const statsFull = await Click.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.send(statsFull);
  } catch (error) {
    console.error('Error fetching full click stats:', error);
    res.status(500).send({ message: 'Erro no servidor' });
  }
});

export default router;
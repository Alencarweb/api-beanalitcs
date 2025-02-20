import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ message: 'Usuário não encontrado' });
    }
    const isMatch = await bcrypt.compare(String(password), String(user.password));

    if (!isMatch) {
      return res.status(400).send({ message: 'Senha incorreta' });
    }


    // const isMatch = await bcrypt.compare(password, user.password); 
    // if (!isMatch) {
    //   return res.status(400).send({ message: 'Senha incorreta' });
    // }

    const token = jwt.sign({ userId: user._id }, '1230978!@7tgbhAsdasd75fFtyfi', { expiresIn: '48h' });
    res.send(token);
  } catch (error) {
    console.error(error); 
    res.status(500).send({ message: 'Erro no servidor'+error });
  }
});


export default router;
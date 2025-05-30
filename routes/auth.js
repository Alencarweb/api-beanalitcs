import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '48h' });
    res.send({token});
  } catch (error) {
    console.error(error); 
    res.status(500).send({ message: 'Erro no servidor'+error });
  }
});

router.post('/validate', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send({ valid: true, decoded });
  } catch (error) {
    res.status(401).send({ valid: false, message: 'Token inválido' });
  }
});
export default router;
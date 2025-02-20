import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log(token);
  if (!token) {
    return res.status(401).send({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, '1230978!@7tgbhAsdasd75fFtyfi');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).send({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
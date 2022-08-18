import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/models';

const route = express.Router();

route.post('/registration', async (req, res) => {
  const { email, password } = req.body;
  try {
    const currUser = await User.findOne({ where: { email } });
    if (!currUser) {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashPassword });
      req.session.userSession = { email: newUser.email };
      return res.json({ email: newUser.email });
    }
    res.status(400).json({ message: 'Такой email уже занят' });
  } catch (err) {
    console.error(err);
  }
});

route.post('/createtag', async (req, res) => {
  // DLYA  СОЗДАНИЯ ТЕГОВ
  // const { email, password } = req.body;
  // try {
  //   const currUser = await User.findOne({ where: { email } });
  //   if (!currUser) {
  //     const hashPassword = await bcrypt.hash(password, 10);
  //     const newUser = await User.create({ email, password: hashPassword });
  //     req.session.userSession = { email: newUser.email };
  //     return res.json({ email: newUser.email });
  //   }
  //   res.status(400).json({ message: 'Такой email уже занят' });
  // } catch (err) {
  //   console.error(err);
  // }
});

export default route;

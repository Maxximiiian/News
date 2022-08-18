import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/models';
import authCheck from '../middlewares/authCheck'

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

route.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const currUser = await User.findOne({ where: { email } });
    if (currUser) {
      const comparePassword = await bcrypt.compare(password, currUser.password);
      if (comparePassword){
        req.session.userSession = { email: currUser.email};
        return res.json({ email: currUser.email });
      }
    }
    res.status(400).json({ message: 'email or password uncorrected' });
  } catch (err) {
    console.error(err);
  }
});
route.get('/logout', async (req, res) => {
  res.clearCookie('user_sid'); // Удалить куку
  req.session.destroy(); // Завершить сессию
  res.sendStatus(200);
});


route.post('/createtag', authCheck, async (req, res) => {
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

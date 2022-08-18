import express from 'express';
import bcrypt from 'bcrypt';

import { User, Tag, UserTags } from '../db/models';
import authCheck from '../middlewares/authCheck';

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
      if (comparePassword) {
        req.session.userSession = { email: currUser.email };
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
  try {
    const {
      tagName, tagChoise, authState,
    } = req.body;
    const currUser = await User.findOne({ where: { email: authState.email } });
    // console.log(currUser.email);
    const currUserId = currUser.dataValues.id;
    const [newTag, hadAdded] = await Tag.findOrCreate({
      where: {
        tagName,
      },
    });
    // console.log(newTag.dataValues.id);
    if (tagChoise === 'false') {
      const userTag = await UserTags.findOrCreate({
        where: {
          userId: currUserId,
          tagId: newTag.dataValues.id,
          isFavorite: false,
        },
      });
    } else {
      const userTag = await UserTags.findOrCreate({
        where: {
          userId: currUserId,
          tagId: newTag.dataValues.id,
          isFavorite: true,
        },
      });
    }
  } catch (err) {
    console.error(err);
  }
});

route.get('/getnews', async (req, res) => {
  const data = await fetch('http://www.vedomosti.ru/newsline/out/rss.xml');
  // console.log(await data.text());
  const newData = await data.text();
  res.json(newData);
});

export default route;

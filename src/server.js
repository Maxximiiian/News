import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import store from 'session-file-store';

import indexRouter from './routes/indexRouter';
import apiRouter from './routes/apiRouter';

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');

const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid', // Имя куки для хранения id сессии. По умолчанию - connect.sid
  secret: process.env.SESSION_SECRET ?? 'test',	// Секретное слово для шифрования, может быть любым
  resave: false, // Пересохранять ли куку при каждом запросе
  saveUninitialized: false, // Создавать ли сессию без инициализации ключей в req.session
  store: new FileStore(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // Срок истечения годности куки в миллисекундах
    httpOnly: true, // Серверная установка и удаление куки, по умолчанию true
  },
};

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session(sessionConfig));

app.use('/', indexRouter);
app.use(authCheck);
app.use('/api/v1', apiRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});

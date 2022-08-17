import express from 'express';
import morgan from 'morgan';

import indexRouter from './routes/indexRouter';

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});

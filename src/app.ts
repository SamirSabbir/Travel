import express from 'express';
import cors from 'cors';
import router from './routes/routes';
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api', router);

export default app;

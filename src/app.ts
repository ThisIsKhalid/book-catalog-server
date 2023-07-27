import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global error handler
app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to B Land');
});

export default app;

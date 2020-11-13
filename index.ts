import express, { request, response, Router } from 'express';

import rateRouter from './rate';

const app = express();

const PORT = 8000;

// app.use(express.json());

app.listen(PORT, () =>
  console.log(`Express server currently running on port ${PORT}`)
);

app.get('/', (request, response) => {
  response.send('Main page');
});

app.use('/rate', rateRouter);

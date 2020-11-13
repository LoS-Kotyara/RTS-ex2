import { error } from 'console';
import { Router, Request, Response, NextFunction } from 'express';

import axios from 'axios';

const router = Router();

const baseURL = 'https://api.exchangeratesapi.io';
const base = 'USD';

const getByDate = async (date: string) => {
  try {
    const response = await axios.get(`${baseURL}/${date}?base=${base}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

router.use((req, res, next) => {
  console.log({
    time: Date.now(),
    method: req.method,
    url: req.originalUrl,
  });
  next();
});

const checkDateFormat = (req: Request, res: Response, next: NextFunction) => {
  const { date } = req.params;

  if (!/^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/.test(date)) {
    res.status(422).send('Invalid time value');
  } else {
    next();
  }
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500);
  res.send(err);
};

router.use('/:date', checkDateFormat);
router.use('/:date', errorHandler);

router.get('/:date', async (req, res) => {
  const { date } = req.params;

  const result = await getByDate(date);

  res.status(200).type('text/plain').send(result);
});

export default router;

/* eslint-disable no-console */
import { Router } from 'express';
import { toXML } from 'jstoxml';
import estimator from './estimator';

const route = Router();

route.post('/', (req, res) => {
  const response = estimator(req.body);
  return res.json({ ...response });
});

route.post('/xml', (req, res) => {
  const response = estimator(req.body);
  res.type('application/xml');
  return res.send(toXML({ ...response }));
});

export default route;

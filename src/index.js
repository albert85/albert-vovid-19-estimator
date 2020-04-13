import express from 'express';
import { urlencoded, json } from 'body-parser';
import { toXML } from 'jstoxml';
import fs from 'fs';
import path from 'path';

import responseTime from 'response-time';
import estimator from './estimator';
import { readLogsFromFile } from './util';

const app = express();

app.use(responseTime((req, res, time) => {
  try {
    const dbPath = `${path.join(__dirname, '../database')}/phoneBookTest.txt`;
    const newLog = `${req.method}\t\t${req.originalUrl}\t\t${res.statusCode}\t\t${Math.floor(time).toString().padStart(2, '00')}ms\n`;
    fs.appendFile(dbPath, newLog, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log('file saved');
    });
  } catch (e) {
    throw new Error('Sorry, an error occured while writing the log');
  }
}));

app.use(urlencoded({ extended: true }));

app.use(json());

const jsonFormat = (req, res) => {
  const response = estimator(req.body);
  return res.status(200).json({ ...response });
};

app.post('/api/v1/on-covid-19', (req, res) => {
  jsonFormat(req, res);
});

app.post('/api/v1/on-covid-19/json', (req, res) => {
  jsonFormat(req, res);
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  try {
    const response = readLogsFromFile();
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    return res.status(200).send(response);
  } catch (error) {
    throw new Error('Sorry, an error occured while reading the log');
  }
});

app.post('/api/v1/on-covid-19/xml', (req, res) => {
  const response = estimator(req.body);
  res.type('application/xml');
  return res.status(200).send(toXML({ ...response }));
});

app.get('/', (req, res) => res.json({ status: 'testing route' }));

const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port', port);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on PORT ${port}`));

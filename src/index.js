import express from 'express';
import { urlencoded, json } from 'body-parser';
import route from './route';

const app = express();

app.use(urlencoded({ extended: true }));

app.use(json());

app.use('/api/v1/on-covid-19', route);

app.use('/', (req, res) => res.json({ status: 'testing route' }));

const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port', port);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on PORT ${port}`));

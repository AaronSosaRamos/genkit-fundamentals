import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { fundamentals_test } from './fundamentals/fundamentals.js';
import { indexMenu } from './rag/indexMenu.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.post('/test', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).send('Query is required');
  }
  const result = await fundamentals_test(query);
  res.status(200).send(result);
});

app.post('/index', async (req, res) => {
  const { fileName } = req.body;
  if (!fileName) {
    return res.status(400).send('File Name is required');
  }
  await indexMenu(fileName);
  res.status(200).send("Index has been generated successfully");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
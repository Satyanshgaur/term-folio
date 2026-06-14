import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import handler from './local-ask-handler.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Wrapper to make Vercel handler compatible with Express
app.post('/api/ask', async (req, res) => {
  try {
    // Vercel CLI adds some helpers to res, we'll mimic the ones we use
    const vercelRes = {
      status: (code) => {
        res.status(code);
        return vercelRes;
      },
      json: (data) => {
        res.json(data);
        return vercelRes;
      },
      setHeader: (name, value) => {
        res.setHeader(name, value);
        return vercelRes;
      },
      end: () => res.end()
    };

    await handler(req, vercelRes);
  } catch (err) {
    console.error('Local API Server Error:', err);
    res.status(500).json({ error: 'Local API server encountered an error.' });
  }
});

app.listen(port, () => {
  console.log(`[Local_API] Server running at http://localhost:${port}`);
  console.log(`[Local_API] Proxy configured in Vite to route /api -> ${port}`);
});

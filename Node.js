import { CohereClientV2 } from 'cohere-ai';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await cohere.chat({
      messages,
      temperature: 0.3,
      model: 'command-a-03-2025',
      responseFormat: { type: 'text' },
    });
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));

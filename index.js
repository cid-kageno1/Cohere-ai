import express from 'express';
import cors from 'cors';
import { CohereClientV2 } from 'cohere-ai';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Cohere client with API key stored in environment variable
const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages array' });
  }

  try {
    const response = await cohere.chat({
      messages,
      temperature: 0.3,
      model: 'command-a-03-2025',
      responseFormat: { type: 'text' }
    });

    res.json(response);
  } catch (err) {
    console.error('Cohere API error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Use port from environment (Vercel/Render) or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

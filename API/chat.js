import { CohereClientV2 } from 'cohere-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages array' });
  }

  try {
    const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

    const response = await cohere.chat({
      messages,
      temperature: 0.3,
      model: 'command-a-03-2025',
      responseFormat: { type: 'text' }
    });

    res.status(200).json(response);
  } catch (err) {
    console.error('Cohere API error:', err);
    res.status(500).json({ error: err.message });
  }
}

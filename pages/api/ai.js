// pages/api/ai.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body || {};

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const response = completion.data.choices[0].message.content;
    return res.status(200).json({ result: response });
  } catch (error) {
    console.error('OpenAI API Error:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Something went wrong with OpenAI API' });
  }
}

// test-key-text.js
// Verifica que la API‑Key funciona con una petición solo de texto.
import { GoogleGenAI } from '@google/genai';
async function main() {
  try {
    const apiKey = process.env.VITE_API_KEY || process.env.API_KEY;
    if (!apiKey) throw new Error('API key not found');
    const genAI = new GoogleGenAI({ apiKey });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [{ text: 'Return a JSON with field "msg":"hello world"' }],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: { msg: { type: 'string' } },
          required: ['msg'],
        },
        temperature: 0,
      },
    });
    console.log('✅ Texto OK →', JSON.parse(response.text));
  } catch (err) {
    console.error('❌ Error texto:', err);
    if (err.response?.status) {
      console.error('   HTTP status:', err.response.status);
      console.error('   Body:', err.response.data);
    }
  }
}
main();
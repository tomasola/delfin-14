// test-key.js
// Verifica que la API‑Key de Gemini funciona con una petición mínima
import { GoogleGenAI, Type } from '@google/genai';
// Imagen de 1×1 píxel blanco (base64). No consume cuota.
const tinyWhitePixel =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+XK8UAAAAASUVORK5CYII=';
async function main() {
  try {
    const apiKey = process.env.VITE_API_KEY || process.env.API_KEY;
    if (!apiKey) throw new Error('API key not found in environment variables');
    const genAI = new GoogleGenAI({ apiKey });
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/png', data: tinyWhitePixel } },
          { text: 'Return a JSON with a field "ok": true' },
        ],
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: { ok: { type: Type.BOOLEAN } },
          required: ['ok'],
        },
        temperature: 0,
      },
    });
    const json = JSON.parse(response.text);
    console.log('✅ Llamada exitosa, respuesta:', json);
  } catch (err) {
    console.error('❌ Error al validar la API key:', err.message);
    if (err.response?.status) {
      console.error('   HTTP status:', err.response.status);
      console.error('   Body:', err.response.data);
    }
  }
}
main();
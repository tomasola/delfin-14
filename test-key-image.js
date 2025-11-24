// test-key-image.js
// Verifica que la API‑Key funciona con una imagen real.
import { readFile } from 'fs/promises';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';

// Ruta absoluta de la imagen que subiste previamente
const IMAGE_PATH = path.resolve(
    'C:/Users/tomas/.gemini/antigravity/brain/4df9fa7e-5b8b-4d1c-99ed-daf280a282e7/uploaded_image_1763988204492.jpg'
);

async function main() {
    try {
        const apiKey = process.env.VITE_API_KEY || process.env.API_KEY;
        if (!apiKey) throw new Error('API key not found');

        // Lee la imagen y conviértela a base64 (sin prefijo data:…)
        const raw = await readFile(IMAGE_PATH);
        const base64 = raw.toString('base64');

        const genAI = new GoogleGenAI({ apiKey });

        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: base64 } },
                    { text: 'Return a JSON with field "ok": true' },
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

        console.log('✅ Imagen OK →', JSON.parse(response.text));
    } catch (err) {
        console.error('❌ Error imagen:', err);
        if (err.response?.status) {
            console.error('   HTTP status:', err.response.status);
            console.error('   Body:', err.response.data);
        }
    }
}

main();

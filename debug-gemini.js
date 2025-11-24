// debug-gemini.js
import { readFile } from 'fs/promises';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';

// Configuración idéntica a geminiService.ts
const MODEL_NAME = 'gemini-2.5-flash';

// Schema idéntico
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        reference: { type: Type.STRING, description: "The product reference code or ID found on the label." },
        length: { type: Type.STRING, description: "The length dimension found on the label (e.g., 6000mm, 6m)." },
        quantity: { type: Type.STRING, description: "The quantity or count found on the label." },
        boundingBox: {
            type: Type.OBJECT,
            description: "The bounding box of the technical drawing/profile sketch (usually black lines on white background). Returns values normalized 0-1000.",
            properties: {
                ymin: { type: Type.NUMBER },
                xmin: { type: Type.NUMBER },
                ymax: { type: Type.NUMBER },
                xmax: { type: Type.NUMBER },
            },
            required: ["ymin", "xmin", "ymax", "xmax"]
        }
    },
    required: ["reference", "length", "quantity", "boundingBox"]
};

// Ruta de la imagen de prueba
const IMAGE_PATH = path.resolve('C:/Users/tomas/.gemini/antigravity/brain/4df9fa7e-5b8b-4d1c-99ed-daf280a282e7/uploaded_image_1763988204492.jpg');

async function main() {
    try {
        const apiKey = process.env.VITE_API_KEY;
        if (!apiKey) throw new Error("API Key is missing");

        console.log(`🔑 Usando API Key: ${apiKey.substring(0, 10)}...`);

        // 1. Leer imagen y simular formato Data URL (como viene del frontend)
        const raw = await readFile(IMAGE_PATH);
        const base64Raw = raw.toString('base64');
        const base64Image = `data:image/jpeg;base64,${base64Raw}`;

        console.log("📸 Imagen leída y convertida a Data URL simulado.");

        // 2. Lógica exacta de geminiService.ts
        // Clean base64 header if present
        const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `
      Analyze this industrial label. 
      Extract the Reference Number, Length, and Quantity.
      Also, identify the technical drawing or profile cross-section (usually a black line drawing). 
      Return the bounding box for this drawing.
      If a field is not found, return empty string.
    `;

        console.log("🚀 Enviando petición a Gemini...");

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.1,
            }
        });

        console.log("✅ Respuesta recibida:");
        console.log(response.text);

    } catch (error) {
        console.error("❌ Error en debug:", error);
        if (error.response) {
            console.error("   Status:", error.response.status);
            console.error("   Data:", JSON.stringify(error.response.data, null, 2));
        }
    }
}

main();

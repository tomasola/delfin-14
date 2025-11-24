import { GoogleGenAI, Type } from "@google/genai";
import { ExtractedData } from '../types';

const MODEL_NAME = 'gemini-2.5-flash';

// Define schema for structured output
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

export const analyzeImage = async (base64Image: string): Promise<ExtractedData> => {
  let apiKey = '';
  try {
    // Validate API Key presence
    // Prioritize Vite env var, fallback to process.env
    apiKey = import.meta.env.VITE_API_KEY || process.env.API_KEY || '';

    console.log("Using API Key starting with:", apiKey ? apiKey.substring(0, 10) + "..." : "undefined");

    if (!apiKey) {
      throw new Error("API Key is missing. Please check your configuration in Vercel or .env file.");
    }

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
        temperature: 0.1, // Low temp for accuracy
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text) as ExtractedData;
    return data;

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    const keyPrefix = apiKey ? apiKey.substring(0, 10) + "..." : "undefined";
    throw new Error(`[Key used: ${keyPrefix}] ${error.message || error}`);
  }
};
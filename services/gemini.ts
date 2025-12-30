
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getCreativeDirection = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `Eres "El Diamante", el consultor creativo de IA de Montero Films. 
        Tu objetivo es ayudar a directores y artistas a conceptualizar videos musicales, cortometrajes y comerciales de alto impacto visual.
        Hablas con un tono profesional, cinematográfico y sofisticado. 
        Ofrece ideas sobre iluminación, encuadres (cinematografía), locaciones y estética visual basándote en la petición del usuario.
        Responde en español de forma concisa y creativa.`,
        temperature: 0.8,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, mi lente creativo está empañado en este momento. Inténtalo de nuevo.";
  }
};

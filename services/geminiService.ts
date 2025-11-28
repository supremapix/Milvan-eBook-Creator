import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check if API key is present
export const checkApiKey = (): boolean => {
  return !!apiKey;
};

export const generateEbookContent = async (topic: string, tone: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key not found");

  const model = "gemini-2.5-flash";
  const prompt = `
    Aja como um escritor profissional de best-sellers e especialista em ${topic}.
    Escreva um mini-eBook completo sobre o tema: "${topic}".
    Tom de voz: ${tone}.
    
    Estrutura obrigatória (use Markdown para formatar):
    1. Título Impactante (H1)
    2. Introdução envolvente (explicando o problema e a solução)
    3. 3 Capítulos principais (H2) com conteúdo prático e detalhado.
    4. Conclusão inspiradora.
    
    O conteúdo deve ser original, educativo e formatado perfeitamente para leitura.
    Não inclua notas do autor, apenas o conteúdo do livro.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    return text;
  } catch (error) {
    console.error("Error generating eBook:", error);
    throw error;
  }
};

export const suggestCoverIdeas = async (topic: string): Promise<string[]> => {
  if (!apiKey) return ["Design abstrato moderno", "Minimalista com tipografia forte", "Futurista com cores vibrantes"];

  const model = "gemini-2.5-flash";
  const prompt = `Dê 3 ideias curtas e visuais para uma capa de eBook sobre: "${topic}". Retorne apenas uma lista simples.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text?.split('\n').filter(line => line.trim().length > 0) || [];
  } catch (error) {
    return ["Design moderno", "Estilo corporativo", "Ilustração criativa"];
  }
};
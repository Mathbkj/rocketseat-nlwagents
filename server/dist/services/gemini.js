import { GoogleGenAI } from "@google/genai";
import { GOOGLE_GENAI_API_KEY } from "../envLoader.js";
export const gemini = new GoogleGenAI({
    apiKey: GOOGLE_GENAI_API_KEY,
});
const model = "gemini-2.5-flash";
export async function transcribeAudio(audioAsBase64, mimeType) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: "Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.",
            },
            {
                inlineData: {
                    data: audioAsBase64,
                    mimeType,
                },
            },
        ],
    });
    if (!response.text)
        throw new Error("Conversão de áudio falhou: Não há conteúdo para escrever");
    if (response.text.trim().length < 0) {
        throw new Error("Não foi possível identificar algum áudio para ser transcrito");
    }
    return response.text.trim();
}
export async function generateEmbeddings(text) {
    const response = await gemini.models.embedContent({
        model: "text-embedding-004",
        contents: [
            {
                text,
            },
        ],
        config: { taskType: "RETRIEVAL_DOCUMENT" },
    });
    if (!response.embeddings?.[0].values) {
        throw new Error("Não foi possível gerar embeddings para o texto fornecido");
    }
    return response.embeddings[0].values;
}
export async function generateAnswer(question, transcriptions) {
    const context = transcriptions.join("\n\n");
    const prompt = `
    Com base no texto fornecido abaixo
    como contexto, responda à pergunta
    de forma clara e precisa. Responder
    sempre em português do Brasil

    CONTEXTO:${context}

    PERGUNTA: ${question}

    INSTRUÇÕES:
    - Use apenas as informações contidas no contexto
    - Se a resposta não estiver no contexto, diga "Não sei sobre"
    - Seja objetivo
    - Mantenha um tom educativo e profissional
    - Cite trechos relevantes do contexto se apropriado
  
  `.trim();
    const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ text: prompt }],
    });
    if (!response.text) {
        throw new Error("Não foi possível gerar uma resposta para a pergunta");
    }
    return response.text.trim();
}

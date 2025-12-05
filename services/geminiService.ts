import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResponse } from "../types";
import { getKnowledgeBaseContext } from "./knowledgeService";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeImage = async (base64Image: string): Promise<AnalysisResponse> => {
  
  const kbContext = getKnowledgeBaseContext();
  
  const systemInstruction = `You are a highly experienced Japanese Beauty Consultant (J-Beauty expert). 
  Your goal is to provide a polite, respectful, and holistic analysis of the user's face to improve their health and beauty.
  
  You have access to a specific Knowledge Base of tips. You MUST incorporate relevant principles from this knowledge base into your advice where applicable.
  
  Knowledge Base Context:
  ${kbContext}

  Tone: Polite, encouraging, "Omotenashi" (hospitality) spirit. 
  Focus on natural beauty, skin health, and minimalist makeup typical of Japanese trends.
  `;

  const prompt = "Please analyze this image. Provide skin analysis, makeup advice, and health/lifestyle recommendations based on visual cues (e.g., dark circles might indicate lack of sleep). Output strictly in JSON.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skinAnalysis: {
              type: Type.OBJECT,
              properties: {
                tone: { type: Type.STRING },
                texture: { type: Type.STRING },
                concerns: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            beautyAdvice: {
              type: Type.OBJECT,
              properties: {
                makeupTips: { type: Type.ARRAY, items: { type: Type.STRING } },
                skincareRoutine: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            healthAdvice: {
              type: Type.OBJECT,
              properties: {
                dietary: { type: Type.ARRAY, items: { type: Type.STRING } },
                lifestyle: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            overallImpression: { type: Type.STRING }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResponse;
    } else {
      throw new Error("No response text received from Gemini");
    }

  } catch (error) {
    console.error("Gemini Analysis Failed", error);
    throw error;
  }
};
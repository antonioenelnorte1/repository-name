
import { GoogleGenAI } from "@google/genai";
import { Language } from '../types';
import { UI_STRINGS } from '../translations';

export const getGeminiResponse = async (userMessage: string, lang: Language) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const t = UI_STRINGS[lang].chat;

  const siteContext = `
    You are the NorthLink Assistant. Your priority is to answer based on NorthLink's internal information:
    - MISSION: Connecting Spanish talent with Norwegian companies.
    - RECRUITMENT: Candidates are interviewed by our recruitment department.
    - LANGUAGE: Candidates pass specialized Norsk exams tailored to their roles.
    - SERVICES: "Find Talent" for companies (verified profiles, vetted ID) and "Work in Norway" (Living, Learning, Documents guides).
    
    POLICY ON HUMAN CONTACT:
    - If you CAN answer the user's question using the site info or general knowledge about Norway, do so directly and DO NOT mention a human advisor.
    - ONLY if you are unable to help with a specific problem, technical issue on the web, or a question about NorthLink services that you don't have information about, then you should state you cannot help and provide this EXACT text: ${t.humanContact}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `${siteContext}\n\nAnswer in ${lang === 'es' ? 'Spanish' : lang === 'no' ? 'Norwegian' : 'English'}. Professional and concise.`,
      },
    });

    return response.text || "Error processing request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "An error occurred. Please try again later.";
  }
};

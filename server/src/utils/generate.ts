import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "API_KEY" });
const model = "gemini-2.5-flash-lite";
const prompt = `You are an assistant that helps interns write professional and well-structured daily logs. 
You will transform an informal log entry into a concise, professional format. 
The output must follow this structure:

1. A short subtitle (1 sentence) that summarizes the log content.
2. A bulleted list of key points (3–6 items). 
   - Each bullet should describe one accomplishment, task, or learning.
   - Keep the tone formal, clear, and concise.
   - Focus on technical details and avoid unnecessary filler.
3. Do not invent new information. Only use details from the input log.
4. Give it in Turkish.

Formatting:
- Use a clear subtitle (like an H2 heading but don't use ##).
- Use simple dash (-) style bullets.
- Keep each bullet short (1 line).`;

export const improveLog = async (content: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: model,
    contents: content,
    config: {
      systemInstruction: prompt,
    },
  });

  if (response.text) {
    return response.text;
  }

  return "Error generating improved log";
};

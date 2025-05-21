// server/config/gemini-config.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
export const configureGemini = () => {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
        console.error("CRITICAL ERROR: GEMINI_API_KEY is not defined in environment variables!");
        throw new Error("GEMINI_API_KEY is not defined.");
    }
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    // ⭐ Use one of these models for the Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    // OR
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    return model;
};
//# sourceMappingURL=gemini-config.js.map
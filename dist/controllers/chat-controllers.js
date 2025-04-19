import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";
import { isAxiosError } from "axios";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        // Step 1: Authenticate user
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or token is invalid." });
        }
        // Step 2: Format chat history
        const chats = user.chats.map(chat => ({
            role: chat.role,
            content: chat.content,
        }));
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        // Step 3: Configure OpenAI
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        // Step 4: Setup retry logic
        const maxRetries = 3;
        let attempt = 0;
        let delayMs = 2000;
        let chatResponse = null;
        while (attempt < maxRetries) {
            try {
                chatResponse = await openai.createChatCompletion({
                    model: "gpt-4.1-mini",
                    messages: chats,
                });
                break; // Success!
            }
            catch (error) {
                if (isAxiosError(error) && error.response?.status === 429) {
                    attempt++;
                    console.warn(`⚠️ Rate limit reached (attempt ${attempt}/${maxRetries}). Retrying in ${delayMs / 1000}s...`);
                    if (attempt === maxRetries) {
                        return res.status(429).json({
                            message: "Too many requests to OpenAI. Please try again later.",
                        });
                    }
                    await new Promise(res => setTimeout(res, delayMs));
                    delayMs *= 2; // Exponential backoff
                }
                else {
                    // Unexpected error
                    console.error("❌ Unexpected error from OpenAI:", error);
                    return res.status(500).json({
                        message: "OpenAI request failed",
                        error: error.message,
                    });
                }
            }
        }
        // Step 5: Save assistant response
        const assistantMessage = chatResponse?.data.choices[0].message;
        if (!assistantMessage) {
            return res.status(500).json({ message: "No response from OpenAI." });
        }
        user.chats.push({
            role: assistantMessage.role,
            content: assistantMessage.content,
        });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("❌ Server error during chat completion:", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
//# sourceMappingURL=chat-controllers.js.map
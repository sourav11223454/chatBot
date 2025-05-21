// server/controllers/chat-controllers.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/User.js"; // Assuming your User model
import { configureGemini } from "../config/gemini-config.js"; // ⭐ Import the new configureGemini function
import { GenerativeModel } from '@google/generative-ai'; // Import GenerativeModel type for clarity

// Interface for chat messages (assuming your Mongoose schema uses these types)
interface ChatMessage {
  role: string;
  content: string;
}

// ⭐ 1. generateChatCompletion Controller (updated for Gemini)
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("\n--- Entering generateChatCompletion controller ---");
  try {
    const { message } = req.body;
    const userId = res.locals.jwtData?.id; // Authenticated user ID from token
    if (!userId) {
      console.error("Chat Controller: userId not found in res.locals.jwtData after token verification.");
      return res.status(401).json({ message: "Authentication data missing." });
    }

    const user = await User.findById(userId);
    if (!user) {
      console.error(`Chat Controller: User with ID ${userId} not found.`);
      return res.status(401).json({ message: "User not registered or not found." });
    }

    // Prepare chat history for Gemini.
    // Gemini's generateContent method typically takes 'contents' as a list of { role: 'user' | 'model', parts: [{ text: string }] }
    // We need to map 'assistant' role from our DB to 'model' for Gemini.
    const historyForGemini = user.chats.map((chat: ChatMessage) => {
        return {
            role: chat.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: chat.content }],
        };
    });

    console.log("User's existing chats (transformed for Gemini):", historyForGemini.length > 0 ? historyForGemini[0] : "No existing chats");

    // Add the new user message to the history for the API call
    const newUserMessageForGemini = { role: "user", parts: [{ text: message }] };
    historyForGemini.push(newUserMessageForGemini);

    // Also store the new user message in the user's chat history in the DB
    user.chats.push({ content: message, role: "user" });

    // Get the configured Gemini model instance
    const geminiModel: GenerativeModel = configureGemini(); // Ensure this matches return type

    console.log("Making API call to Gemini...");
    // ⭐ Choose your strategy:
    // For single-turn, send only the last message:
    const result = await geminiModel.generateContent({
        contents: [newUserMessageForGemini] // Sending only the latest user message
    });
    // OR, for full conversational context using startChat:
    // const chatSession = geminiModel.startChat({ history: historyForGemini.slice(0, -1) }); // Pass all except the *new* user message as history
    // const result = await chatSession.sendMessage(message); // Send the *new* user message

    const chatResponse = result.response;
    const assistantResponse = chatResponse.text(); // Gemini's response is often in .text()

    if (!assistantResponse) {
        console.error("Chat Controller: Assistant response content is empty or undefined from Gemini.");
        return res.status(500).json({ message: "No response from AI model." });
    }

    // Store the assistant's response in the user's chat history in the DB
    user.chats.push({ content: assistantResponse, role: "assistant" });
    await user.save();
    console.log("User chats saved to DB.");

    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.error("❌ Error in generateChatCompletion (Gemini API):", error.message);
    if (error.response && error.response.error) {
        console.error("Gemini API Error Details:", error.response.error);
        return res.status(error.response.status || 500).json({
            message: "Something went wrong with chat generation from Gemini.",
            error: error.response.error.message || error.message
        });
    }
    return res.status(500).json({ message: "Something went wrong with chat generation.", error: error.message });
  }
};

// ⭐ 2. sendChatsToUser Controller (to fetch all chats for a user)
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("\n--- Entering sendChatsToUser controller ---");
  try {
    const userId = res.locals.jwtData?.id; // Authenticated user ID
    if (!userId) {
      return res.status(401).json({ message: "User ID not found in token data." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user._id.toString() !== userId) { // Extra check for security
      return res.status(401).json({ message: "Unauthorized access." });
    }

    console.log(`Sending ${user.chats.length} chats for user ${user.email}.`);
    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.error("❌ Error in sendChatsToUser:", error.message);
    return res.status(500).json({ message: "Failed to retrieve chats.", error: error.message });
  }
};

// ⭐ 3. deleteChats Controller (to delete all chats for a user)
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("\n--- Entering deleteChats controller ---");
  try {
    const userId = res.locals.jwtData?.id; // Authenticated user ID
    if (!userId) {
      return res.status(401).json({ message: "User ID not found in token data." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user._id.toString() !== userId) { // Extra check for security
      return res.status(401).json({ message: "Unauthorized access." });
    }

    user.chats = []; // Clear the chats array
    await user.save();
    console.log(`Chats cleared for user ${user.email}.`);

    return res.status(200).json({ message: "Chats deleted successfully." });
  } catch (error: any) {
    console.error("❌ Error in deleteChats:", error.message);
    return res.status(500).json({ message: "Failed to delete chats.", error: error.message });
  }
};
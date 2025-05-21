import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => randomUUID(),
    },
    role: {
        type: String,
        required: true,
        enum: ["system", "user", "assistant"], // Add enum validation in schema too
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [chatSchema],
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=User.js.map
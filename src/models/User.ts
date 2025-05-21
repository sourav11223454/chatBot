import mongoose, { Document } from "mongoose";
import { randomUUID } from "crypto";

export interface IChat {
    id?: string;
    role: "system" | "user" | "assistant";  // strict role type
    content: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    chats: IChat[];   // Use IChat[] here instead of inline object
}

const chatSchema = new mongoose.Schema<IChat>({
    id: {
        type: String,
        default: () => randomUUID(),
    },
    role: {
        type: String,
        required: true,
        enum: ["system", "user", "assistant"],  // Add enum validation in schema too
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const userSchema = new mongoose.Schema<IUser>({
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

const User = mongoose.model<IUser>("User", userSchema);
export default User;

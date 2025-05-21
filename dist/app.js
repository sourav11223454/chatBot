// server/app.ts
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit"; // ⭐ Import the rate limiting middleware
import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chat-routes.js";
// Load environment variables from .env file
config();
const app = express();
// ⭐ Trust proxy headers for accurate IP identification in production
// If your Node.js app runs behind a proxy (like Nginx, Apache, or a cloud load balancer),
// Express needs to be told to trust the X-Forwarded-For header.
// Set to 1 if you have one proxy, 'loopback' for trusted local addresses, or specify IPs.
// For cloud environments like Render, Railway, or AWS, '1' or true is often appropriate.
app.set('trust proxy', 1);
// =========================================================================
//                             MIDDLEWARES
// =========================================================================
// Parse JSON request bodies
app.use(express.json());
// HTTP request logger middleware for development
app.use(morgan("dev"));
// CORS configuration - crucial for allowing frontend to talk to backend
app.use(cors({
    origin: "http://localhost:5173", // ⭐ Your frontend's actual origin (Vite dev server)
    credentials: true, // Allow cookies (and other credentials like auth headers) to be sent cross-origin
}));
// Cookie Parser configuration - for parsing signed cookies (like auth_token)
if (!process.env.JWT_SECRET) {
    // Log a critical error if JWT_SECRET is not defined, as cookie-parser and JWT verification depend on it.
    console.error("CRITICAL ERROR: JWT_SECRET is not defined in environment variables. Cookie parser and JWT verification will not work correctly.");
    // In production, you might want to exit the process or take other drastic measures.
}
app.use(cookieParser(process.env.JWT_SECRET)); // Use JWT_SECRET as the secret for signed cookies
// =========================================================================
//                             RATE LIMITING
// =========================================================================
// Limiter for authentication routes (login, signup)
// More strict to prevent brute-force attacks
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Allow 5 requests per IP per 15 minutes
    message: {
        status: 429,
        message: "Too many authentication attempts from this IP, please try again after 15 minutes.",
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable the deprecated `X-RateLimit-*` headers
});
// Limiter for chat routes
// Helps control AI API costs and prevents rapid flooding of chat requests
const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20, // Allow 20 chat messages per IP per minute
    message: {
        status: 429,
        message: "Too many chat requests, please slow down and try again in a minute.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
// =========================================================================
//                             ROUTES
// =========================================================================
// Apply authLimiter to specific authentication endpoints
app.post("/api/v1/user/login", authLimiter, userRoutes); // Apply directly to specific method/path
app.post("/api/v1/user/signup", authLimiter, userRoutes); // Apply directly to specific method/path
// Apply chatLimiter to the chat generation endpoint
app.post("/api/v1/chat/new", chatLimiter, chatRoutes); // Apply directly to specific method/path
// Mount the user and chat routers.
// Note: If you apply limiters above directly to paths, ensure they don't conflict
// with how you've set up your routes inside userRoutes/chatRoutes itself.
// The `app.use` below means `userRoutes` will handle any path starting with `/api/v1/user`
// and `chatRoutes` will handle any path starting with `/api/v1/chat`.
// If you want the limiter to apply to the *entire* router, you can do:
// app.use("/api/v1/user", authLimiter, userRoutes); // Applies to all user routes
// app.use("/api/v1/chat", chatLimiter, chatRoutes); // Applies to all chat routes
// For now, I've kept separate application for clarity based on previous discussion,
// but you might want to adjust the order or where you apply them.
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
// =========================================================================
//                          GLOBAL ERROR HANDLING
// =========================================================================
// Centralized error handling middleware
app.use((err, req, res, next) => {
    // Log the error for server-side debugging
    console.error("Global error handler caught an error:", err);
    // Determine appropriate status code (default to 500 Internal Server Error)
    const statusCode = err.status || 500;
    // Use the error message if available, otherwise a generic one
    const message = err.message || "An unexpected error occurred.";
    // Include stack trace only in development for security
    const errorDetails = process.env.NODE_ENV === 'development' ? { stack: err.stack } : {};
    // Send the error response to the client
    res.status(statusCode).json({
        message: message,
        ...errorDetails
    });
});
// Export the Express application for use in server.ts or other entry files
export default app;
//# sourceMappingURL=app.js.map
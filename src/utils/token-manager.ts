// server/utils/token-manager.ts
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const COOKIE_NAME = "auth_token";

interface JwtPayload {
    id: string;
    email: string;
}

// Keep it as string, because at runtime '7d' is a string
type ExpiresIn = string; // Simpler type for our `createToken` function's parameter

// ✅ Token Creation Utility
export const createToken = (id: string, email: string, expiresIn: ExpiresIn = "7d") => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("CRITICAL ERROR: JWT_SECRET is not defined when creating token.");
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const secret: Secret = jwtSecret;
    const payload: JwtPayload = { id, email };

    // ⭐ FIX THIS LINE: Use a type assertion for expiresIn in SignOptions
    const signOptions: SignOptions = {
        expiresIn: expiresIn as SignOptions['expiresIn'] // Assert that our string is compatible with SignOptions' expiresIn type
    };

    const token = jwt.sign(payload, secret, signOptions);
    console.log("Token Created:", { id, email, expiresIn, token_length: token.length });
    return token;
};

// ... (rest of the file - verifyToken, exports) ...
// ... (rest of the file - verifyToken, exports) ...

// ... (rest of the file - verifyToken, exports) ...

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    console.log("\n--- Entering verifyToken middleware ---"); // DEBUG
    console.log("Signed Cookies:", req.signedCookies); // DEBUG: See all signed cookies

    const token = req.signedCookies[COOKIE_NAME];
    console.log(`Looking for cookie '${COOKIE_NAME}'. Found token:`, token ? "YES" : "NO", token ? `(length: ${token.length})` : ""); // DEBUG

    if (!token || token.trim() === "") {
        console.warn("⚠️ verifyToken: No token received in signed cookies or token is empty."); // DEBUG
        return res.status(401).json({ message: "Token not received" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("CRITICAL ERROR: JWT_SECRET is not defined when verifying token."); // DEBUG
        return res.status(500).json({ message: "Server configuration error: JWT secret missing." });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret as Secret) as JwtPayload;
        res.locals.jwtData = decoded;
        console.log("✅ Token verified successfully. Decoded JWT Data:", decoded); // DEBUG
        next();
    } catch (error: any) {
        console.error("❌ JWT Verification Error (in verifyToken catch block):", error.message); // DEBUG
        if (error.name === 'TokenExpiredError') {
            console.warn("Token expired."); // DEBUG
            // Optionally clear cookie here if it's expired, good for UX
            res.clearCookie(COOKIE_NAME, {
                httpOnly: true,
                signed: true,
                path: "/",
                domain: process.env.COOKIE_DOMAIN,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            });
            return res.status(401).json({ message: "Token Expired. Please log in again." });
        }
        return res.status(401).json({ message: "Invalid or malformed token" }); // Generic invalid token
    }
};

export { JwtPayload };
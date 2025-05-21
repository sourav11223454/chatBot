import { Router } from "express";
import { getAllUsers, userLogin, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
// Get all users (for admin or testing)
userRoutes.get("/", getAllUsers);
// User signup with validation middleware
userRoutes.post("/signup", validate(signupValidator), userSignup);
// User login with validation middleware
userRoutes.post("/login", validate(loginValidator), userLogin);
// Verify user auth status using token middleware
userRoutes.get("/auth-status", verifyToken, verifyUser);
// Logout route: clears the auth cookie and responds with success
userRoutes.post("/logout", (req, res) => {
    res.clearCookie("auth_token", {
        path: "/",
        httpOnly: true,
        signed: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ message: "Logged out successfully" });
});
export default userRoutes;
//# sourceMappingURL=user-routes.js.map
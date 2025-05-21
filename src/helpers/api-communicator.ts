import axios from "axios";

// Base Axios instance config
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // ⭐ Ensure this matches your backend server URL
  withCredentials: true, // ⭐ CRITICAL: Ensures cookies are sent and received automatically
});

// ⭐ REMOVED: Request Interceptor for Authorization header.
// Cookies are handled automatically by `withCredentials: true` and browser.

// ⭐ OPTIONAL BUT RECOMMENDED: Add a Response Interceptor for global error handling
api.interceptors.response.use(
  (response) => response, // Just return the response if it's successful
  (error) => {
    // console.error("Axios Interceptor: Response error", error.response);
    if (error.response?.status === 401) {
      console.warn("Unauthorized request. Token might be expired or invalid. User needs to re-authenticate.");
      // If you want to force a redirect on 401, you'd do it here.
      // For now, let the AuthProvider handle clearing state.
      // window.location.href = "/login"; // Example: hard redirect
    }
    return Promise.reject(error); // Re-throw the error so specific catch blocks can handle it
  }
);


// ✅ Login User
export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/user/login", { email, password });
  if (res.status !== 200) throw new Error("Unable to login");
  // Backend sets the cookie. Frontend just needs to know login was successful.
  return res.data; // This should contain { name, email } (token is in cookie)
};

// ✅ Signup User
export const signupUser = async (name: string, email: string, password: string) => {
  const res = await api.post("/user/signup", { name, email, password });
  if (res.status !== 201) throw new Error("Unable to signup"); // Common for successful creation
  // Backend sets the cookie. Frontend just needs to know signup was successful.
  return res.data; // This should contain { name, email }
};

// ✅ Check Auth Status
export const checkAuthStatus = async () => {
  const res = await api.get("/user/auth-status");
  if (res.status !== 200) throw new Error("Unable to authenticate");
  // Backend verifies cookie. Frontend gets user data if valid.
  return res.data; // This should contain { status: boolean, name: string, email: string }
};

// ✅ Send Chat Message
export const sendChatRequest = async (message: string) => {
  const res = await api.post("/chat/new", { message });
  if (res.status !== 200) throw new Error("Unable to send chat");
  return res.data; // Should return { chats: IChat[] }
};

// ✅ Get User Chats
export const getUserChats = async () => {
  const res = await api.get("/chat/all-chats");
  if (res.status !== 200) throw new Error("Unable to fetch chats");
  return res.data; // Should return { chats: IChat[] }
};

// ✅ Delete All User Chats
export const deleteUserChats = async () => {
  const res = await api.delete("/chat/delete");
  if (res.status !== 200) throw new Error("Unable to delete chats");
  return res.data; // Should return success message
};

// ✅ Logout User
export const logoutUser = async () => {
  const res = await api.post("/user/logout", {}); // Backend clears the cookie
  if (res.status !== 200) throw new Error("Unable to logout");
  return res.data; // Should return success message
};
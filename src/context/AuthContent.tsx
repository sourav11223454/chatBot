import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, signupUser, logoutUser } from "../helpers/api-communicator"; // Ensure logoutUser is imported
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Type definitions - No changes needed here, still good
type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  loading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Context
const AuthContext = createContext<UserAuth | null>(null);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // This request will automatically send the cookie due to withCredentials: true
        const data = await checkAuthStatus();
        if (data && data.status) { // Assuming checkAuthStatus returns { status: true, name, email } if token is valid
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
          toast.success("Successfully authenticated!", { id: "authStatus" });
        } else {
          setUser(null);
          setIsLoggedIn(false);
          toast.error("Authentication failed or token expired.", { id: "authStatus" });
        }
      } catch (err) {
        console.error("Authentication status check failed:", err);
        setUser(null);
        setIsLoggedIn(false);
        toast.error("Failed to verify authentication status.", { id: "authStatus" });
      } finally {
        setLoading(false);
      }
    };
    checkStatus();
  }, []);

  // Login handler
  const login = async (email: string, password: string) => {
    try {
      // This call will set the cookie on the backend
      const data = await loginUser(email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
        navigate("/chat");
        toast.success("Logged in successfully!", { id: "login" });
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Login failed. Please check your credentials.", { id: "login" });
      throw err;
    }
  };

  // Signup handler
  const signup = async (name: string, email: string, password: string) => {
    try {
      // This call will set the cookie on the backend
      const data = await signupUser(name, email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
        navigate("/chat");
        toast.success("Signed up successfully!", { id: "signup" });
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
      toast.error(err.response?.data?.message || "Signup failed. Please try again.", { id: "signup" });
      throw err;
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      // This call will clear the cookie on the backend
      await logoutUser();
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
      toast.success("Logged out successfully!", { id: "logout" });
    } catch (err) {
      console.error("Error logging out:", err);
      toast.error("Logout failed.", { id: "logout" });
    }
  };

  // Context value
  const authContextValue: UserAuth = {
    user,
    isLoggedIn,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Type definitions
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
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkStatus();
  }, []);

  // Login handler
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
      navigate("/chat"); // Redirect after login
    }
  };

  // Signup handler
  const signup = async (name: string, email: string, password: string) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/user/signup",
      { name, email, password },
      { withCredentials: true }
    );
    const data = res.data;
    if (data) {
      setUser({ email: data.email, name: data.name });
      setIsLoggedIn(true);
      navigate("/chat"); // Redirect after signup
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      // Send request to backend logout route
      await axios.post("http://localhost:5000/api/v1/user/logout", {}, { withCredentials: true });
      setUser(null);
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home or login page
    } catch (err) {
      console.error("Error logging out:", err);
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

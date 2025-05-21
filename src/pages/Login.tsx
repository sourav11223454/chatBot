import { IoIosLogIn } from "react-icons/io";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContent";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login-animation.json";
import "./Login.css";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    if (auth?.isLoggedIn) {
      navigate("/chat");
    }
  }, [auth?.isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Authenticating...", { id: "login" });
      await auth?.login(email, password);
      toast.success("Access granted", { id: "login" });
    } catch (error) {
      console.error(error);
      toast.error("Authentication failed", { id: "login" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className={`login-container ${isAnimating ? "animate-in" : ""}`}>
      <div className="login-background"></div>

      <div className="login-content">
        <div className="login-animation">
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <CustomizedInput
            type="email"
            name="email"
            label="Email"
            fullWidth
            className="input-field"
          />
          <CustomizedInput
            type="password"
            name="password"
            label="Password"
            fullWidth
            className="input-field"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="submit-button"
            disabled={isLoading}
            endIcon={<IoIosLogIn />}
          >
            {isLoading ? (
              <span className="button-loading">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
              </span>
            ) : (
              "SUBMIT"
            )}
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Login;

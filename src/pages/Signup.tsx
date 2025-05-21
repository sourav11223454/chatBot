import { IoIosLogIn } from "react-icons/io";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContent";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import signupAnimation from "../assets/signup-animation.json";
import "./signup.css"; // NEW: separate CSS

const Signup = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      navigate("/chat");
    }
  }, [auth?.isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };

  return (
    <Box className="signup-container">
      <div className="signup-background"></div>

      <div className="signup-content">
        <div className="signup-animation">
          <Lottie animationData={signupAnimation} loop />
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <Typography
            variant="h4"
            textAlign="center"
            paddingBottom={2}
            fontWeight={600}
            color="#fff"
          >
            Signup
          </Typography>

          <CustomizedInput
            type="text"
            name="name"
            label="Name"
            fullWidth
            className="input-field"
          />
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
            endIcon={<IoIosLogIn />}
          >
            Signup
          </Button>
        </form>
      </div>
    </Box>
  );
};

export default Signup;

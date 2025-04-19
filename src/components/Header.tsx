import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContent";
import NavigationLink from "./shared/NavigationLink";

// Define the types for the props
interface HeaderProps {
  onLogout: () => Promise<void>;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onLoginClick, onSignupClick }) => {
  const auth = useAuth();

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #00040f, #020617)",
        boxShadow: "none",
        paddingY: 1.5,
        paddingX: { xs: 2, md: 4 },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Logo />

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {auth?.loading ? null : auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textcolor="black"
              />
              <NavigationLink
                bg="#51538f"
                textcolor="white"
                to="/"
                text="Logout"
                onClick={onLogout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textcolor="black"
                onClick={onLoginClick}
              />
              <NavigationLink
                bg="#51538f"
                textcolor="white"
                to="/signup"
                text="Signup"
                onClick={onSignupClick}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

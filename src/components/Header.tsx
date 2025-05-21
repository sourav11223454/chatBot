import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContent";

// Define the types for the props
interface HeaderProps {
  onLogout: () => Promise<void>;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
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
            <button
              onClick={onLogout}
             className="custom-logout-button"
            >
              LOGOUT
            </button>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

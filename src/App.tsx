import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContent";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.loading) return <div className="text-white text-center mt-10">Loading...</div>;

  // ✅ Navigate to login page
  const handleLoginClick = () => {
    navigate("/login");
  };

  // ✅ Navigate to signup page
  const handleSignupClick = () => {
    navigate("/signup");
  };

  // ✅ Handle logout async
  const handleLogout = async (): Promise<void> => {
    await auth.logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#00040f] to-[#020617] text-white font-sans">
      <Header
        onLogout={handleLogout}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          {!auth.isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          {auth.isLoggedIn && (
            <>
              <Route path="/chat" element={<Chat />} />
              <Route path="/login" element={<Navigate to="/chat" replace />} />
              <Route path="/signup" element={<Navigate to="/chat" replace />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

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

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");
  const handleLogout = async (): Promise<void> => {
    await auth.logout();
    navigate("/");
  };

  if (auth.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-t-2 border-blue-500 w-16 h-16 rounded-full" />
      </div>
    );
  }

  const renderPublicRoutes = () => (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  );

  const renderPrivateRoutes = () => (
    <>
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Navigate to="/chat" replace />} />
      <Route path="/signup" element={<Navigate to="/chat" replace />} />
    </>
  );

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
          {auth.isLoggedIn ? renderPrivateRoutes() : renderPublicRoutes()}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

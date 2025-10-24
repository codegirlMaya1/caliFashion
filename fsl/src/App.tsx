import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import DestinationPage from "./pages/Destination"; // adjust path if needed
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import useVoice from "./hooks/useVoice";

const App: React.FC = () => {
  const { transcript, startListening, listening } = useVoice();

  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/destination" element={<DestinationPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>

        {/* 🎙 Voice button */}
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "8px",
            zIndex: 999,
          }}
        >
          {/* ✨ Live Transcript Bubble */}
          {transcript && (
            <div
              style={{
                background: "rgba(76, 77, 220, 0.9)",
                color: "white",
                borderRadius: "16px",
                padding: "10px 16px",
                maxWidth: "240px",
                fontSize: "0.9rem",
                lineHeight: "1.4",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                backdropFilter: "blur(6px)",
                transition: "opacity 0.3s ease",
              }}
            >
              {transcript}
            </div>
          )}

          {/* 🎧 Microphone Button */}
          <button
            onClick={startListening}
            style={{
              background: listening ? "#4C4DDC" : "#1E1E2F",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              fontSize: "1.4rem",
              cursor: "pointer",
              boxShadow: listening
                ? "0 0 20px rgba(76,77,220,0.6)"
                : "0 0 8px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
            }}
            title="Click to talk to Samuel"
          >
            🎙
          </button>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
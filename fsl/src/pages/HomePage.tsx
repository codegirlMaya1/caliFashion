import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import useVoice from "../hooks/useVoice";
import mensCatalog from "../assets/mens-catalog.png";

const categories = [
  { name: "electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
  { name: "jewelery", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { name: "men's clothing", image: mensCatalog },
  { name: "women's clothing", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { transcript, speak, listening, startListening, hasGreeted, setHasGreeted } = useVoice();
  const [hasNavigated, setHasNavigated] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started && !hasGreeted) {
      const greetOnce = async () => {
        setHasGreeted(true);
        await speak(
          "Hi, I'm Samuel your virtual shopping assistant. You can say electronics, jewelry, men's clothing, or women's clothing to begin."
        );
        startListening();
      };
      greetOnce();
    }
  }, [started, hasGreeted]);

  useEffect(() => {
    const t = transcript.toLowerCase();
    if (!t || hasNavigated) return;

    const match = (keywords: string[]) => keywords.some(k => t.includes(k));

    if (match(["electronics", "electronic"])) {
      setHasNavigated(true);
      navigate("/category/electronics");
    } else if (match(["jewelry", "jewelery"])) {
      setHasNavigated(true);
      navigate("/category/jewelery");
    } else if (match(["men", "men's clothing"])) {
      setHasNavigated(true);
      navigate("/category/men's%20clothing");
    } else if (match(["women", "women's clothing"])) {
      setHasNavigated(true);
      navigate("/category/women's%20clothing");
    }
  }, [transcript, hasNavigated, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #f8f9fc, #eef2f9)",
        overflowX: "hidden"
      }}
    >
      {!started && (
        <button
          onClick={() => setStarted(true)}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#4c4ddc",
            color: "white",
            border: "none",
            borderRadius: "8px",
            zIndex: 1000
          }}
        >
          Start Shopping Assistant
        </button>
      )}

      <h5
        style={{
          color: "#333",
          fontWeight: 500,
          marginTop: "2rem",
          marginBottom: "2.5rem",
          textAlign: "center",
          fontSize: "1.1rem"
        }}
      >
        Thanks for choosing{" "}
        <span style={{ color: "#4c4ddc", fontWeight: 600 }}>Cali Fashion</span> — you can speak or click a
        category card to get started.
      </h5>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2rem",
          width: "100%",
          padding: "0 3rem 4rem",
          boxSizing: "border-box"
        }}
      >
        {categories.map((c) => (
          <CategoryCard key={c.name} category={c.name} image={c.image} />
        ))}
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#4c4ddc",
          color: "white",
          padding: "10px 20px",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer"
        }}
        onClick={() => startListening()}
        title="Click to talk to Samuel"
      >
        🎙️ {listening ? "Listening..." : "Click to Talk"}
      </div>
    </div>
  );
};

export default HomePage;
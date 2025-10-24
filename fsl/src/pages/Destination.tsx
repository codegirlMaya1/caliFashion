import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useVoice from "../hooks/useVoice";
import Confetti from "react-confetti";

const DestinationPage: React.FC = () => {
  const { speak } = useVoice();
  const navigate = useNavigate();
  const hasSpoken = useRef(false);
  const [showConfetti, setShowConfetti] = useState(true);

  const receiptNumber = `CF-${Math.floor(100000 + Math.random() * 900000)}`;

  useEffect(() => {
    if (!hasSpoken.current) {
      speak(
        "Thank you for shopping with Cali Fashion. Your purchase was successful. Please shop with us again soon."
      );
      hasSpoken.current = true;
    }

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, [speak]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #f8f9fc, #eef2f9)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Back Arrow */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          color: "#4c4ddc",
          cursor: "pointer",
        }}
        aria-label="Back to Home"
      >
        ← Home
      </button>

      {/* Receipt Card */}
      <div
        style={{
          maxWidth: "700px",
          width: "90%",
          background: "linear-gradient(to right, #ffffff, #f0f4ff)",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          padding: "3rem",
          textAlign: "center",
          border: "1px solid #e0e0e0",
        }}
      >
        <h1 style={{ color: "#4c4ddc", fontWeight: 700, fontSize: "2rem", marginBottom: "1rem" }}>
          🎉 Thank you for choosing Cali Fashion!
        </h1>
        <p style={{ fontSize: "1.3rem", color: "#333", marginBottom: "1rem" }}>
          Your purchase was successful.
        </p>
        <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "1rem" }}>
          Receipt Number: <strong>{receiptNumber}</strong>
        </p>
        <p style={{ fontSize: "1.2rem", color: "#333" }}>
          Please shop with us again soon!
        </p>
      </div>
    </div>
  );
};

export default DestinationPage;
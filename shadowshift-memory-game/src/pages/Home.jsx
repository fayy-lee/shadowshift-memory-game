import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelSelector from "../components/LevelSelector";

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const navigate = useNavigate();

  function startGame() {
    navigate("/game", { state: { difficulty: selectedLevel } });
  }

  return (
    <div className="container" style={{ textAlign: "center", paddingTop: "4rem" }}>
      {/* Hero Section */}
      <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem", color: "#fff" }}>🎮 Welcome to ShadowShift!</h1>
      <p style={{ fontSize: "1.2rem", color: "#aaa" }}>
        A fun and brain-boosting memory game for everyone!
      </p>

      {/* Logo */}
      <div style={{ marginTop: "2rem" }}>
        <img
          src="/favicon.png"
          alt="ShadowShift Logo"
          style={{ width: "120px", height: "120px", margin: "auto" }}
        />
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: "3rem",
          backgroundColor: "#1e1e1e",
          padding: "2rem",
          borderRadius: "12px",
          color: "#eee",
          maxWidth: "600px",
          marginInline: "auto",
          textAlign: "left",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>📝 How to Play</h2>
        <ul style={{ lineHeight: "1.8", fontSize: "1.1rem", paddingLeft: "1rem" }}>
          <li>Click on cards to flip them.</li>
          <li>Match pairs of the same emoji!</li>
          <li>Try to finish with as few moves and as little time as possible.</li>
          <li>Have fun and sharpen your memory! 🧠</li>
        </ul>
      </div>

      {/* Difficulty Selector */}
      <LevelSelector selectedLevel={selectedLevel} onChange={setSelectedLevel} />

      {/* Start Game Button */}
      <button
        onClick={startGame}
        style={{
          marginTop: "2.5rem",
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "10px",
          border: "none",
          background: "#6D28D9",
          color: "#fff",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.background = "#7C3AED")}
        onMouseOut={(e) => (e.target.style.background = "#6D28D9")}
      >
        🚀 Start Game
      </button>
    </div>
  );
}

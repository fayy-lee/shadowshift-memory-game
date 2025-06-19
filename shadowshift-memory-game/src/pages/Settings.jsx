import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [difficulty, setDifficulty] = useState("easy");
  const [theme, setTheme] = useState("fruits");
  const navigate = useNavigate();

  function startGame() {
    navigate("/game", { state: { difficulty, theme } });
  }

  return (
    <div className="container">
      <h1>⚙️ Game Settings</h1>

      <div style={{ maxWidth: "400px", margin: "auto", textAlign: "left" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
          Select Difficulty
        </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            background: "#222",
            color: "#fff",
            fontSize: "1rem",
            border: "none",
            marginBottom: "20px",
          }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
          Select Theme
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            background: "#222",
            color: "#fff",
            fontSize: "1rem",
            border: "none",
            marginBottom: "30px",
          }}
        >
          <option value="fruits">Fruits</option>
          <option value="animals">Animals</option>
        </select>

        <button onClick={startGame} style={{ width: "100%" }}>
          Start Game
        </button>
      </div>
    </div>
  );
}

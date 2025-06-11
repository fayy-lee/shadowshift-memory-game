import React from "react";

export default function Settings() {
  return (
    <div className="container">
      <h1>⚙️ Game Settings</h1>
      <div
        style={{
          display: "grid",
          gap: "20px",
          maxWidth: "400px",
          margin: "auto",
          textAlign: "left",
        }}
      >
        {/* Only Default Difficulty remains */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
            Default Difficulty
          </label>
          <select
            style={{
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              background: "#222",
              color: "#fff",
              fontSize: "1rem",
              border: "none",
            }}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>
    </div>
  );
}

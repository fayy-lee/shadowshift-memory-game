import React from "react";

export default function LevelSelector({ selectedLevel, onChange }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <label htmlFor="level" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        Select Difficulty:
      </label>
      <select
        id="level"
        value={selectedLevel}
        onChange={(e) => onChange(e.target.value)}
        style={{
          marginLeft: "12px",
          padding: "8px 16px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#222",
          color: "#fff",
        }}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

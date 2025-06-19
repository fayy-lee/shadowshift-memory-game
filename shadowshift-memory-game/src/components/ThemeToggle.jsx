import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        marginTop: "1.5rem",
        padding: "10px 20px",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#6D28D9",
        color: "white",
        cursor: "pointer",
        transition: "background-color 0.3s",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#7C3AED")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#6D28D9")}
    >
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}

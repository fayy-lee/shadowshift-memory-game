import React, { useState, useEffect } from "react";
import "../index.css";

const symbols = ["🍎", "🍌", "🍇", "🍉", "🥝", "🍒", "🍍", "🥥"];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function GameBoard() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disableClicks, setDisableClicks] = useState(false);

  useEffect(() => {
    const deck = shuffleArray([...symbols, ...symbols]).map((symbol, index) => ({
      id: index,
      symbol,
    }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
  }, []);

  function handleCardClick(index) {
    if (disableClicks || flipped.includes(index) || matched.includes(index)) return;

    if (flipped.length === 1) {
      setFlipped((prev) => [...prev, index]);
      setDisableClicks(true);

      setTimeout(() => {
        const firstIndex = flipped[0];
        if (cards[firstIndex].symbol === cards[index].symbol) {
          setMatched((prev) => [...prev, firstIndex, index]);
        }
        setFlipped([]);
        setDisableClicks(false);
      }, 800);
    } else {
      setFlipped([index]);
    }
  }

  return (
    <div className="container">
      <h1>🧠 Memory Game</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={isFlipped}
              style={{
                fontSize: "2rem",
                borderRadius: "12px",
                height: "80px",
                backgroundColor: isFlipped ? "#6D28D9" : "#111",
                color: isFlipped ? "#fff" : "#111",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                transition: "0.3s ease",
              }}
            >
              {isFlipped ? card.symbol : "❓"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

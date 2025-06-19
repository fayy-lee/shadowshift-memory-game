import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const themes = {
  fruits: ["🍎", "🍌", "🍇", "🍉", "🥝", "🍒", "🍍", "🥥"],
  animals: ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐵", "🐯"],
};

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function GameBoard() {
  const location = useLocation();
  const difficulty = location.state?.difficulty || "easy";
  const theme = location.state?.theme || "fruits";

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disableClicks, setDisableClicks] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const pairsCount = {
    easy: 4,
    medium: 6,
    hard: 8,
  }[difficulty] || 4;

  useEffect(() => {
    const symbols = themes[theme] || themes.fruits;
    const selectedSymbols = symbols.slice(0, pairsCount);
    const deck = shuffleArray([...selectedSymbols, ...selectedSymbols]).map((symbol, index) => ({
      id: index,
      symbol,
    }));
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setTimer(0);
    setGameStarted(false);
  }, [difficulty, pairsCount, theme]);

  useEffect(() => {
    let interval = null;
    if (gameStarted) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else if (!gameStarted && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStarted, timer]);

  function handleCardClick(index) {
    if (disableClicks || flipped.includes(index) || matched.includes(index)) return;

    if (!gameStarted) setGameStarted(true);

    if (flipped.length === 1) {
      setFlipped((prev) => [...prev, index]);
      setDisableClicks(true);
      setMoves((m) => m + 1);

      setTimeout(() => {
        const firstIndex = flipped[0];
        if (cards[firstIndex].symbol === cards[index].symbol) {
          setMatched((prev) => [...prev, firstIndex, index]);
        }
        setFlipped([]);
        setDisableClicks(false);
      }, 1000);
    } else {
      setFlipped([index]);
    }
  }

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameStarted(false);
      alert(`🎉 You won! Moves: ${moves}, Time: ${timer} seconds.`);
    }
  }, [matched, cards.length, moves, timer]);

  return (
    <div className="container">
      <h1>Memory Game</h1>
      <div style={{ marginBottom: "1rem" }}>
        <span>Moves: {moves}</span> | <span>Time: {timer}s</span> | <span>Difficulty: {difficulty}</span> | <span>Theme: {theme}</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(4, 80px)`,
          gap: "1rem",
          justifyContent: "center",
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
                width: "80px",
                height: "80px",
                fontSize: "2rem",
                borderRadius: "10px",
                border: "none",
                cursor: isFlipped ? "default" : "pointer",
                backgroundColor: isFlipped ? "#6D28D9" : "#333",
                color: isFlipped ? "white" : "transparent",
                userSelect: "none",
                transition: "background-color 0.3s ease",
              }}
              aria-label={isFlipped ? `Card ${card.symbol}` : "Hidden card"}
            >
              {isFlipped ? card.symbol : "❓"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

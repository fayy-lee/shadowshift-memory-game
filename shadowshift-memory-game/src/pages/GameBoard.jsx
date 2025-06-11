import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const symbols = ["🍎", "🍌", "🍇", "🍉", "🥝", "🍒", "🍍", "🥥"];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function GameBoard() {
  const location = useLocation();
  const difficulty = location.state?.difficulty || "easy";

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disableClicks, setDisableClicks] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Number of pairs based on difficulty
  const pairsCount = {
    easy: 4,
    medium: 6,
    hard: 8,
  }[difficulty] || 4;

  // Initialize deck & reset game
  useEffect(() => {
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
  }, [difficulty, pairsCount]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
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

  // Check for win
  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameStarted(false);
      alert(`🎉 You won! Moves: ${moves}, Time: ${timer} seconds.`);
    }
  }, [matched, cards.length, moves, timer]);

  return (
    <div className="game-container" style={{ padding: "2rem", textAlign: "center" }}>
      {/* Stats */}
      <div
        style={{
          marginBottom: "1rem",
          color: "#eee",
          fontSize: "1.2rem",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div>Moves: {moves}</div>
        <div>Time: {timer}s</div>
        <div>Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</div>
      </div>

      {/* Toggle Info Button */}
      <button
        onClick={() => setShowInfo(true)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#6D28D9",
          color: "white",
          cursor: "pointer",
        }}
      >
        ❓ How to Play
      </button>

      {/* Info Modal */}
      {showInfo && (
        <div
          style={{
            position: "relative",
            background: "#1f1f1f",
            color: "#fff",
            padding: "1.5rem",
            borderRadius: "12px",
            marginBottom: "1.5rem",
            maxWidth: "500px",
            marginInline: "auto",
            textAlign: "left",
          }}
        >
          <button
            onClick={() => setShowInfo(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
              background: "transparent",
              border: "none",
              color: "#ccc",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
          <h2 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>Game Instructions</h2>
          <ul style={{ lineHeight: "1.8", fontSize: "1.1rem", paddingLeft: "1rem" }}>
            <li>Click on cards to flip them.</li>
            <li>Match pairs of the same emoji.</li>
            <li>Matched cards stay revealed.</li>
            <li>Try to match all cards in the fewest moves and shortest time!</li>
          </ul>
        </div>
      )}

      {/* Game Board */}
      <div
        className="grid"
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
              }}
              disabled={isFlipped}
            >
              {isFlipped ? card.symbol : "❓"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

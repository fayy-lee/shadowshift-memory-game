import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const allThemes = {
  fruits: ["🍎", "🍌", "🍇", "🍉", "🥝", "🍒", "🍍", "🥥"],
  animals: ["🐶", "🐱", "🦊", "🐸", "🐵", "🐮", "🐰", "🐼"],
};

const themeColors = {
  fruits: "#6D28D9",  // purple
  animals: "#F59E0B", // orange
};

const feedbackEmojis = ["🎯", "💡", "🚀", "🧠", "👏", "⭐"];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function GameBoard() {
  const location = useLocation();

  const difficulty = location.state?.difficulty || "easy";
  const theme = location.state?.theme || "fruits";

  const symbols = allThemes[theme] || allThemes.fruits;
  const themeColor = themeColors[theme] || "#6D28D9";

  const pairsCount = {
    easy: 4,
    medium: 6,
    hard: 8,
  }[difficulty] || 4;

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [disableClicks, setDisableClicks] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [feedbackEmoji, setFeedbackEmoji] = useState("🎉");

  const initializeGame = () => {
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
    setDisableClicks(false);
    setGameOver(false);
    setFeedbackEmoji(feedbackEmojis[Math.floor(Math.random() * feedbackEmojis.length)]);
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty, theme]);

  useEffect(() => {
    let interval = null;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  const handleCardClick = (index) => {
    if (disableClicks || flipped.includes(index) || matched.includes(index) || gameOver) return;

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
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameStarted(false);
      setGameOver(true);
    }
  }, [matched, cards.length]);

  const restartGame = () => initializeGame();

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
          flexWrap: "wrap",
          userSelect: "none",
        }}
      >
        <div>Moves: {moves}</div>
        <div>Time: {timer}s</div>
        <div>Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</div>
        <div>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</div>
      </div>

      {/* Info Button */}
      <button
        onClick={() => setShowInfo(true)}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          border: "none",
          backgroundColor: themeColor,
          color: "white",
          cursor: "pointer",
        }}
      >
        ❓ How to Play
      </button>

      {/* Info Modal */}
      {showInfo && (
        <div
          className="info-modal"
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
            aria-label="Close instructions"
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

      {/* Game Grid */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
          gap: "1rem",
          justifyContent: "center",
          maxWidth: "400px",
          margin: "0 auto",
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
                cursor: isFlipped || gameOver ? "default" : "pointer",
                backgroundColor: isFlipped ? themeColor : "#333",
                color: isFlipped ? "white" : "transparent",
                userSelect: "none",
                transition: "background-color 0.3s ease",
              }}
              disabled={isFlipped || gameOver}
              aria-label={isFlipped ? `Card showing ${card.symbol}` : "Hidden card"}
            >
              {isFlipped ? card.symbol : "❓"}
            </button>
          );
        })}
      </div>

      {/* Game Over Dialog */}
      {gameOver && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gameOverTitle"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.85)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1 id="gameOverTitle">{feedbackEmoji} You won! {feedbackEmoji}</h1>
          <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
            Moves: {moves} <br />
            Time: {timer} seconds
          </p>
          <button
            onClick={restartGame}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              borderRadius: "10px",
              border: "none",
              background: themeColor,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

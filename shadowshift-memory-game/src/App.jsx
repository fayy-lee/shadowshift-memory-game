import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import GameBoard from "./pages/GameBoard.jsx";
import Settings from "./pages/Settings.jsx";
import NavBar from "./components/NavBar.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

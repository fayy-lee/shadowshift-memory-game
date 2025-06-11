import React from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

export default function NavBar() {
  return (
    <nav>
      <div className="left">
        <img src="/favicon.png" alt="Logo" />
        ShadowShift
      </div>
      <div className="right">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/game">Game</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </div>
    </nav>
  );
}

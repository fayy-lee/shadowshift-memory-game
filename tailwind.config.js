import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Game", path: "/game" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left side: logo + title */}
        <div className="flex items-center space-x-3 select-none">
          <img
            src="/favicon.png"
            alt="Logo"
            className="h-6 w-6 object-contain"
            draggable="false"
          />
          <span className="font-bold text-lg tracking-wide">ShadowShift</span>
        </div>

        {/* Right side: nav links */}
        <div className="flex space-x-8">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"} // exact match only for home
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 hover:text-indigo-400 ${
                  isActive
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-gray-300"
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

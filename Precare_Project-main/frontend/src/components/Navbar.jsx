// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ username, onLogout, onAboutClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ FIXED SCROLL FUNCTION
  const handleScroll = (id) => {
    const tryScroll = () => {
      let section = document.getElementById(id);

      // fallback for Predict Cost (since no id there)
      if (!section && id === "predict") {
        section = document.querySelector("section");
      }

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        return true;
      }
      return false;
    };

    const waitForSectionAndScroll = () => {
      const interval = setInterval(() => {
        if (tryScroll()) {
          clearInterval(interval);
        }
      }, 100);
    };

    if (location.pathname !== "/home") {
      navigate("/home");
      setTimeout(waitForSectionAndScroll, 300);
    } else {
      waitForSectionAndScroll();
    }

    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md sticky top-0 z-50">
      
      {/* Reduced navbar height */}
      <div className="container mx-auto flex justify-between items-center px-6 py-2">

        {/* Logo + Welcome */}
        <div className="flex items-center gap-4 h-full">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="PreCare Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-contain bg-white p-1 shadow"
            />
          </Link>

          {username && (
            <span className="text-sm md:text-base font-medium">
              Welcome, {username}
            </span>
          )}
        </div>

        {/* DESKTOP MENU */}
        <div className="space-x-6 hidden md:flex items-center">
          <Link to="/" className="hover:text-yellow-400">Home</Link>

          <button onClick={onAboutClick} className="hover:text-yellow-400">
            About
          </button>

          <button onClick={() => handleScroll("predict")} className="hover:text-yellow-400">
            Predict Cost
          </button>

          <button onClick={() => handleScroll("hospitals")} className="hover:text-yellow-400">
            Hospitals
          </button>

          <button onClick={() => handleScroll("treatment-guide")} className="hover:text-yellow-400">
            Treatment Guide
          </button>

          <button onClick={() => handleScroll("contact")} className="hover:text-yellow-400">
            Contact Us
          </button>

          <Link to="/chatbot" className="hover:text-yellow-400">
            Chatbot
          </Link>

          {username && onLogout && (
            <button
              onClick={onLogout}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-4">

          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </Link>

          <button onClick={onAboutClick} className="block w-full text-left">
            About
          </button>

          <button onClick={() => handleScroll("predict")} className="block w-full text-left">
            Predict Cost
          </button>

          <button onClick={() => handleScroll("hospitals")} className="block w-full text-left">
            Hospitals
          </button>

          <button onClick={() => handleScroll("treatment-guide")} className="block w-full text-left">
            Treatment Guide
          </button>

          <button onClick={() => handleScroll("contact")} className="block w-full text-left">
            Contact Us
          </button>

          <Link to="/chatbot" onClick={() => setMenuOpen(false)} className="block">
            Chatbot
          </Link>

          {username && onLogout && (
            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left bg-white text-blue-600 px-3 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
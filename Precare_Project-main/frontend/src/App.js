// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Auth
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

// Sections
import Hero3D from "./components/Hero3D";
import About from "./components/About";
import PredictCost from "./components/PredictCost";
import Hospitals from "./components/Hospitals";
import TreatmentGuide from "./components/TreatmentGuide";
import HospitalMap from "./components/HospitalMap";
import Chatbot from "./components/Chatbot";
import Contact from "./components/Contact";

function App() {
  const [predictedCost, setPredictedCost] = useState(null);

  // ✅ user state
  const [user, setUser] = useState(null);

  // ✅ loading state
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const hideNavPages = ["/login", "/register", "/forget-password"];

  // Load user AFTER initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  // About scroll handler
  const handleAboutClick = () => {
    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (loading) return null;
  return (
    <div className="flex flex-col min-h-screen">

      {/* Navbar */}
      {user && !hideNavPages.includes(location.pathname) && (
        <Navbar
          username={user.username}
          onLogout={handleLogout}
          onAboutClick={handleAboutClick}
        />
      )}

      <main className="flex-grow">
        <Routes>

          {/* ✅ ONLY CHANGE HERE */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/home" replace />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />

          {/* AUTH */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/forget-password" element={<ForgotPassword />} />

          {/* HOME (protected) */}
          <Route
            path="/home"
            element={
              user ? (
                <>
                  <Hero3D />
                  <About />
                  <PredictCost onPrediction={(cost) => setPredictedCost(cost)} />
                  <Hospitals predictedCost={predictedCost} />
                  <TreatmentGuide />
                  <Contact />
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/treatment-guide"
            element={user ? <TreatmentGuide /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/hospital-map"
            element={user ? <HospitalMap /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/chatbot"
            element={user ? <Chatbot /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/contact"
            element={user ? <Contact /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/predict-cost"
            element={
              user ? (
                <PredictCost onPrediction={(cost) => setPredictedCost(cost)} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/hospitals"
            element={
              user ? (
                <Hospitals predictedCost={predictedCost} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </main>

      {/* Footer */}
      {user && !hideNavPages.includes(location.pathname) && <Footer />}

    </div>
  );
}

export default App;
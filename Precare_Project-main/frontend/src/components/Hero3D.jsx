import React from "react";
import { motion } from "framer-motion";
import { Wallet, Hospital, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import homepageVideo from "../assets/Homepage.mp4";

function Hero3D() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate("/");
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* 🔥 Text Animation ONLY */}
      <style>
        {`
          @keyframes shimmerText {
            0% { background-position: -500px 0; }
            100% { background-position: 500px 0; }
          }

          .animate-text {
            background-size: 1000px 100%;
            animation: shimmerText 3s linear infinite;
          }
        `}
      </style>

      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* 🎥 Background Video */}
        <video
          src={homepageVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* 🌫️ UPDATED DARK OVERLAY */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>

        {/* ⚡ ECG Animation */}
        <svg
          className="absolute top-1/3 left-0 w-full h-32 opacity-80 z-10"
          viewBox="0 0 1200 200"
        >
          <path
            id="ecgPath"
            d="M0,100 L150,100 L200,40 L250,160 L300,100 L400,100 L450,60 L500,140 L550,100 L1200,100"
            stroke="#22d3ee"
            strokeWidth="3"
            fill="none"
            strokeDasharray="2000"
            strokeDashoffset="2000"
          >
            <animate attributeName="stroke-dashoffset" from="2000" to="0" dur="3s" repeatCount="indefinite" />
          </path>

          <circle r="6" fill="#22d3ee">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#ecgPath" />
            </animateMotion>
          </circle>
        </svg>

        {/* 🔥 Heading (Animated Text Only) */}
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 relative z-20"
        >
          <span className="bg-gradient-to-r from-indigo-500 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-text brightness-125">
            Plan Smarter. Live Healthier.
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-text brightness-125">
            with PreCare
          </span>
        </motion.h1>

        {/* 📄 Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl max-w-2xl mb-8 relative z-20 text-white font-semibold"
        >
          Transparent cost predictions and trusted hospital recommendations — everything you need, in one place.
        </motion.p>

        {/* 🔘 Buttons */}
        <motion.div className="flex flex-col md:flex-row gap-4 relative z-20">

          <motion.button
            onClick={() => scrollToSection("predict")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-violet-800 hover:bg-violet-900 text-blue-100 font-bold px-6 py-3 rounded-xl shadow-lg"
          >
            <Wallet className="w-5 h-5" />
            Get Cost Estimate
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("hospitals")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-blue-100 font-bold px-6 py-3 rounded-xl shadow-lg"
          >
            <Hospital className="w-5 h-5" />
            Find Hospitals
          </motion.button>

          <motion.button
            onClick={() => scrollToSection("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-violet-800 hover:bg-violet-900 text-blue-100 font-bold px-6 py-3 rounded-xl shadow-lg"
          >
            <Phone className="w-5 h-5" />
            Contact Us
          </motion.button>
        </motion.div>

        {/* 🌈 Glow Effects */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-violet-700/20 rounded-full blur-3xl z-10"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-700/20 rounded-full blur-3xl z-10"></div>

      </section>
    </>
  );
}

export default Hero3D;
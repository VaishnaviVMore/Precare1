// src/components/TreatmentGuide.jsx
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Stethoscope,
  Syringe,
  Pill,
  Youtube,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import FAQ from "./FAQ";

const TreatmentGuide = () => {
  const scrollRef = useRef(null);

  // =========================
  // Expert Videos (Original + Existing)
  // =========================
  const expertVideos = [
    "VaVC3PAWqLk",
    "e1B-bSvVg5M",
    "LgsJ3V9pIG0",
    "WlxbVMfvir8",
    "Ixdv6YU4AjU",
    "iKI_SiWy1DM",
    "3WE0ORcRBVI",
    "Qosq1b_GSmk",
  ];

  // =========================
  // Success Stories Videos (NEW)
  // =========================
  const successVideos = [
    "q8j_vZRZKx0",
    "zX3Feib6dJ4",
    "xP88P1KM86s",
    "Wl1E83lQ5AE",
    "LFmKwpSOZ7w",
    "5_JaWkjxhk0",
  ];

  const [showSuccess, setShowSuccess] = useState(false);

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="treatment-guide"
      className="relative py-16 px-6 bg-purple-50 min-h-screen overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-16 w-56 h-56 bg-green-300/30 rounded-full blur-3xl"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-purple-800 mb-6 relative z-10"
      >
        Cancer Treatment Guide
        <div className="w-40 h-1 bg-gradient-to-r from-purple-500 to-green-600 mx-auto mt-2 rounded-full"></div>
      </motion.h2>

      {/* =========================
          ORIGINAL CARDS SECTION
         ========================= */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-8">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-xl p-6 text-center">
          <Stethoscope className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-semibold text-purple-700">Diagnosis & Tests</h3>
          <p className="text-gray-600 mt-2">
            Initial checkups, scans, and biopsies to identify cancer.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-xl p-6 text-center">
          <Syringe className="w-12 h-12 text-green-600 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-semibold text-green-700">Surgery</h3>
          <p className="text-gray-600 mt-2">
            Removal of tumor or affected area by expert surgeons.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-xl p-6 text-center">
          <Pill className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <h3 className="text-xl font-semibold text-purple-700">Chemotherapy</h3>
          <p className="text-gray-600 mt-2">
            Use of drugs to destroy or stop the growth of cancer cells.
          </p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-white shadow-md rounded-xl p-6 text-center">
          <Activity className="w-12 h-12 text-green-600 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-semibold text-green-700">Radiation</h3>
          <p className="text-gray-600 mt-2">
            High-energy rays used to kill or shrink cancer cells.
          </p>
        </motion.div>
      </div>

      {/* =========================
          TOGGLE BUTTONS
         ========================= */}
      <div className="flex justify-center gap-4 mt-10 relative z-10">
        <button
          onClick={() => setShowSuccess(false)}
          className={`px-6 py-2 rounded-full font-semibold ${
            !showSuccess
              ? "bg-purple-700 text-white"
              : "bg-white text-purple-700 border border-purple-700"
          }`}
        >
          Expert Videos
        </button>

        <button
          onClick={() => setShowSuccess(true)}
          className={`px-6 py-2 rounded-full font-semibold ${
            showSuccess
              ? "bg-purple-700 text-white"
              : "bg-white text-purple-700 border border-purple-700"
          }`}
        >
          Success Stories
        </button>
      </div>

      {/* =========================
          VIDEO SLIDER (TOGGLED)
         ========================= */}
      <div className="relative z-10 max-w-6xl mx-auto mt-8">
        <h3 className="text-2xl font-bold text-purple-800 flex items-center justify-center gap-2 mb-6">
          <Youtube className="w-6 h-6 text-red-500" />
          {showSuccess ? "Success Stories" : "Learn from Experts"}
        </h3>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-2 px-6 scroll-smooth scrollbar-hide"
          >
            {(showSuccess ? successVideos : expertVideos).map((id, index) => (
              <iframe
                key={index}
                className="min-w-[320px] h-64 rounded-xl shadow-lg flex-shrink-0"
                src={`https://www.youtube.com/embed/${id}?rel=0`}
                title={`video-${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-purple-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-purple-700" />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-purple-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-purple-700" />
          </button>
        </div>
      </div>

      {/* =========================
          FAQ SECTION (UNCHANGED)
         ========================= */}
      <div className="relative z-10 max-w-4xl mx-auto mt-12">
        <FAQ />
      </div>
    </section>
  );
};

export default TreatmentGuide;
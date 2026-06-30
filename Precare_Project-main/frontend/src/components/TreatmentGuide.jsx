
// src/components/TreatmentGuide.jsx

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Microscope,
  Syringe,
  ShieldPlus,
  Users,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Youtube,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import FAQ from "./FAQ";

const TreatmentGuide = () => {

  const scrollRef = useRef(null);

  // =========================
  // Expert Videos (UNCHANGED)
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
  // Success Stories (UNCHANGED)
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

  const [openCard, setOpenCard] = useState(null);

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

  // ===========================================================
  // Treatment Guide Cards
  // ===========================================================

  const guideCards = [
    {
      icon: Microscope,
      title: "Understand Your Diagnosis",
      color: "purple",

      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",

      titleColor: "text-purple-700",

      footerBg: "bg-purple-50",
      footerText: "text-purple-700",

      message:
        "Knowledge is the first step towards healing.",

      bullets: [
        "Know your cancer type and stage",
        "Understand test and scan reports",
        "Ask questions and get clarity",
        "Take a second opinion if needed",
        "Keep all reports organized",
      ],
    },

    {
      icon: Syringe,
      title: "Know Your Treatment Options",
      color: "green",

      iconBg: "bg-green-100",
      iconColor: "text-green-600",

      titleColor: "text-green-700",

      footerBg: "bg-green-50",
      footerText: "text-green-700",

      message:
        "Every treatment plan is personalized.",

      bullets: [
        "Surgery removes or treats the cancer",
        "Chemotherapy destroys cancer cells",
        "Radiation Therapy targets cancer cells",
        "Targeted & Immunotherapy are advanced options",
        "Your doctor selects the best treatment",
      ],
    },

    {
      icon: ShieldPlus,
      title: "Manage Side Effects",
      color: "purple",

      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",

      titleColor: "text-purple-700",

      footerBg: "bg-purple-50",
      footerText: "text-purple-700",

      message:
        "Care, nutrition and rest support recovery.",

      bullets: [
        "Common side effects are manageable",
        "Eat healthy and stay hydrated",
        "Get enough rest",
        "Stay physically active",
        "Report side effects early",
      ],
    },

    {
      icon: Users,
      title: "Emotional & Family Support",
      color: "green",

      iconBg: "bg-green-100",
      iconColor: "text-green-600",

      titleColor: "text-green-700",

      footerBg: "bg-green-50",
      footerText: "text-green-700",

      message:
        "You are not alone. Support makes a difference.",

      bullets: [
        "Talk to family and loved ones",
        "Join a support group",
        "Seek counselling if required",
        "Stay positive one day at a time",
        "Caregivers should care for themselves too",
      ],
    },
  ];
  return (
  <section
    id="treatment-guide"
    className="relative py-16 px-6 bg-[#fbf8ff] overflow-hidden"
  >
    {/* Background Blur */}
    <div className="absolute -left-20 top-10 w-64 h-64 bg-purple-200/30 blur-3xl rounded-full"></div>
    <div className="absolute right-0 bottom-0 w-72 h-72 bg-green-200/20 blur-3xl rounded-full"></div>

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative z-10 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-purple-800">
        Cancer Treatment Guide
      </h2>

      <div className="w-48 h-1 rounded-full bg-gradient-to-r from-purple-500 to-green-500 mx-auto mt-3"></div>

      <p className="mt-5 text-gray-600 text-[15px] max-w-3xl mx-auto leading-7">
        Learn every stage of cancer treatment with trusted guidance,
        practical care tips and family support.
      </p>
    </motion.div>

    {/* Cards */}

    <div className="relative z-10 max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {guideCards.map((item, index) => {

        const Icon = item.icon;

        return (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.12,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -5,
            }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >

            {/* Top Line */}

            <div
              className={`h-1 ${
                item.color === "purple"
                  ? "bg-purple-500"
                  : "bg-green-500"
              }`}
            />

            <div className="px-6 py-6">

              {/* Icon */}

              <motion.div
                animate={{
                  y: [0, -3, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${item.iconBg}`}
              >
                <Icon
                  className={`w-8 h-8 ${item.iconColor}`}
                />
              </motion.div>

              {/* Title */}

              <h3
                className={`text-xl font-semibold text-center mt-5 leading-7 ${item.titleColor}`}
              >
                {item.title}
              </h3>

              {/* Learn More */}

              <button
                onClick={() =>
                  setOpenCard(
                    openCard === index ? null : index
                  )
                }
                className={`mt-6 w-full rounded-full border py-2.5 text-sm font-semibold transition-all ${
                  item.color === "purple"
                    ? "border-purple-200 text-purple-700 hover:bg-purple-50"
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >

                <div className="flex items-center justify-center gap-2">

                  {openCard === index
                    ? "Show Less"
                    : "Learn More"}

                  {openCard === index ? (
                    <ChevronUp size={17} />
                  ) : (
                    <ChevronDown size={17} />
                  )}

                </div>

              </button>
                            {/* =========================
                  Expandable Content
              ========================= */}

              <AnimatePresence>
                {openCard === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6">

                      <ul className="space-y-3">

                        {item.bullets.map((point, i) => (

                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: i * 0.08,
                            }}
                            className="flex items-start gap-3"
                          >

                            <span
                              className={`mt-[8px] w-2 h-2 rounded-full flex-shrink-0 ${
                                item.color === "purple"
                                  ? "bg-purple-500"
                                  : "bg-green-500"
                              }`}
                            />

                            <span className="text-[15px] leading-7 text-gray-700">
                              {point}
                            </span>

                          </motion.li>

                        ))}

                      </ul>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* =========================
                  Bottom Message
              ========================= */}

              <div
                className={`mt-6 rounded-xl border px-4 py-3 flex items-start gap-3 ${
                  item.color === "purple"
                    ? "bg-purple-50 border-purple-100"
                    : "bg-green-50 border-green-100"
                }`}
              >

                <Lightbulb
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    item.color === "purple"
                      ? "text-purple-600"
                      : "text-green-600"
                  }`}
                />

                <p
                  className={`text-sm leading-6 ${
                    item.color === "purple"
                      ? "text-purple-700"
                      : "text-green-700"
                  }`}
                >
                  {item.message}
                </p>

              </div>

            </div>

          </motion.div>

        );

      })}

    </div>

    {/* =========================
        End Treatment Cards
    ========================= */}
          {/* =========================
          EXPERT VIDEOS + SUCCESS STORIES
      ========================= */}

      <div className="relative z-10 mt-16">

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-10">

          <button
            onClick={() => setShowSuccess(false)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition ${
              !showSuccess
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white text-purple-700 border-purple-200 hover:bg-purple-50"
            }`}
          >
            Expert Videos
          </button>

          <button
            onClick={() => setShowSuccess(true)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition ${
              showSuccess
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-green-700 border-green-200 hover:bg-green-50"
            }`}
          >
            Success Stories
          </button>

        </div>

        {/* Section Title */}
        <div className="text-center mb-8">

          <div className="flex items-center justify-center gap-2 text-purple-800">

            <Youtube className="w-5 h-5" />

            <h3 className="text-xl font-semibold">
              {showSuccess ? "Success Stories" : "Learn from Experts"}
            </h3>

          </div>

        </div>

        {/* Video Slider */}
        <div className="relative max-w-6xl mx-auto">

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-2"
          >

            {(showSuccess ? successVideos : expertVideos).map((id, index) => (

              <iframe
                key={index}
                className="min-w-[280px] h-52 rounded-xl shadow-sm border border-gray-100"
                src={`https://www.youtube.com/embed/${id}?rel=0`}
                title={`video-${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />

            ))}

          </div>

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md border border-gray-100 p-2 rounded-full hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md border border-gray-100 p-2 rounded-full hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

        </div>

      </div>
            {/* =========================
          FAQ SECTION
      ========================= */}

      <div className="relative z-10 max-w-4xl mx-auto mt-16">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <FAQ />
        </motion.div>

      </div>

    </section>
  );
};

export default TreatmentGuide;
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { ShieldCheck, HeartPulse, Activity } from "lucide-react";
import hero from "../assets/hero.jpg"; // 👈 healthcare hero image

function Home() {
  // Rotating taglines
  const taglines = [
    "Plan Smarter. Live Healthier.",
    "Predict Costs. Reduce Stress.",
    "Your Health, Your Future.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center 
                 bg-gradient-to-r from-blue-50 via-white to-teal-50 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                 px-6 lg:px-20 transition-colors duration-500"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold mb-4 
                       text-gray-900 dark:text-white"
          >
            {taglines[index]}
          </motion.h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            AI-powered cancer treatment cost prediction for better financial planning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="predict"
              smooth
              duration={600}
              aria-label="Get Started with Prediction"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md 
                         hover:bg-blue-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="demo"
              smooth
              duration={600}
              aria-label="See Demo"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg shadow-md 
                         hover:bg-gray-200 transition
                         dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              See Demo
            </Link>
          </div>
        </motion.div>

        {/* Image + Floating Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <img
            src={hero}
            alt="Healthcare"
            className="w-full max-w-md rounded-2xl shadow-lg object-cover"
          />

          {/* Floating Quick Estimate Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-8 right-4 
                       bg-white dark:bg-gray-800 
                       rounded-xl shadow-lg p-4 w-64 
                       border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">
              Quick Estimate
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Estimated cost for <span className="font-medium">Breast Cancer</span> treatment:
            </p>
            <p className="text-xl font-bold text-blue-600 mb-2">$12,450</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              *Based on average AI prediction
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 
                   text-gray-600 dark:text-gray-300"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-blue-500" size={20} />
          <span>Secure & Private</span>
        </div>
        <div className="flex items-center gap-2">
          <HeartPulse className="text-red-500" size={20} />
          <span>Trusted by 5,000+ patients</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="text-green-500" size={20} />
          <span>AI-Powered Predictions</span>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;

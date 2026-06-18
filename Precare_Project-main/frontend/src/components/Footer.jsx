import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <h2 className="text-xl font-semibold text-white">
          Pre<span className="text-blue-400">Care</span>
        </h2>

        {/* Quick Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/hospitals" className="hover:text-blue-400 transition">Hospitals</Link>
          <Link to="/treatment-guide" className="hover:text-blue-400 transition">Treatment</Link>
          <Link to="/predict-cost" className="hover:text-blue-400 transition">Predict</Link>
        </div>

        {/* Copy */}
        <p className="mt-4 md:mt-0 text-sm text-gray-500">
          © {new Date().getFullYear()} PreCare. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

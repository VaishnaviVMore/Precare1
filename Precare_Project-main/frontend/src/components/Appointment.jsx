// src/pages/AppointmentBooking.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const AppointmentBooking = () => {
  const { id } = useParams(); // get hospital id
  const hospitals = {
    1: "Apollo Hospitals",
    2: "Fortis Memorial Research Institute",
    3: "AIIMS",
    4: "Medanta The Medicity",
    5: "Max Super Speciality Hospital",
    6: "Tata Memorial Hospital",
    7: "Sir Ganga Ram Hospital",
    8: "BLK Super Speciality Hospital",
    9: "Columbia Asia Hospital",
    10: "Nanavati Super Speciality Hospital",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Book Appointment
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          {hospitals[id]}
        </h2>

        {/* Booking Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
            required
          />
          <input
            type="date"
            className="w-full border p-3 rounded-lg"
            required
          />
          <textarea
            placeholder="Symptoms / Notes"
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Confirm Appointment
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;

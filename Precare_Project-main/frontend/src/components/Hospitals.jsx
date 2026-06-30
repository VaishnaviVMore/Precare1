// src/components/Hospitals.jsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { filterByPredictedCostRange } from "../utils/hospitalUtils";
import {
  STATES,
  STATE_CITY_MAP,
  CITY_STATE_MAP,
  INSURANCES,
  SORT_OPTIONS,
  parseCost,
  parseInsuranceList,
  calculateRecommendationScore,
} from "../utils/hospitalUtils";

// ---------------- Images ----------------
import hospitalImages from "../utils/hospitalImageMap";



const Hospitals = ({ predictedCost }) => {

  const [hospitalData, setHospitalData] = useState([]);

  const [selectedSort, setSelectedSort] =
    useState("Recommendation");

  const [selectedState, setSelectedState] =
    useState("All");

  const [selectedCity, setSelectedCity] =
    useState("All");

  const [selectedInsurance, setSelectedInsurance] =
    useState("All");

  const scrollRef = useRef(null);

  const scrollLeft = () => {

    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });

  };

  const scrollRight = () => {

    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });

  };

  // ---------------- Fetch Google Sheet ----------------

  useEffect(() => {

    const fetchHospitals = async () => {

      try {

        const response = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vR4XmKh0Iv4inl7jxtQoHyXfgfH68_DCbs8t2_qcpif2-I873QCqSNwU9g4OlfzAPxMTKxTvw3BrtQ8/pub?output=csv"
        );

        const csv = await response.text();

        const rows = csv
          .split("\n")
          .map((row) =>
            row.split(
              /,(?=(?:(?:[^"]*"){2})*[^"]*$)/
            )
          );

        const headers = rows[0];

        const hospitals = rows.slice(1).map((row, index) => {

          let obj = {};

          headers.forEach((header, i) => {

            obj[header.trim()] =
              row[i]?.replace(/^"|"$/g, "").trim() || "";

          });

          const hospitalName =
            obj["Hospital Name"];

          return {

            id: index + 1,

            name: hospitalName,

            state: obj["State"],

            city: obj["City"],

            cost: parseCost(
              obj["Average cost"]
            ),

            insurance: parseInsuranceList(
              obj["Insurance List"]
            ),

            rating:
              parseFloat(
                obj["Rating (1–5)"] ||
                  obj["Rating (1â€“5)"] ||
                  obj["Rating"]
              ) || 4,

            map:
              obj[
                "Google Map Location Link"
              ] || "#",

            website:
              obj["Website Link"] || "#",

            image: hospitalImages[hospitalName]
            ? `/hospitals/${hospitalImages[hospitalName]}`
            : "https://via.placeholder.com/300x200?text=Hospital",

          };

        });

        setHospitalData(hospitals);

      } catch (error) {

        console.error(
          "Error fetching hospitals:",
          error
        );

      }

    };

    fetchHospitals();

  }, []);
    // ---------------- Cities ----------------

  const availableCities = useMemo(() => {
    if (selectedState === "All") return [];

    return STATE_CITY_MAP[selectedState] || [];
  }, [selectedState]);

  // ---------------- Dropdown Handlers ----------------

  const handleStateChange = (e) => {
    const state = e.target.value;

    setSelectedState(state);
    setSelectedCity("All");
  };

  const handleCityChange = (e) => {
    const city = e.target.value;

    setSelectedCity(city);

    if (city === "All") return;

    if (CITY_STATE_MAP[city]) {
      setSelectedState(CITY_STATE_MAP[city]);
    }
  };

  const handleInsuranceChange = (e) => {
    setSelectedInsurance(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  // ---------------- Filters ----------------

  const filteredHospitals = useMemo(() => {

    let hospitals = [...hospitalData];

    // ---------- State ----------

    if (selectedState !== "All") {
      hospitals = hospitals.filter(
        (hospital) =>
          hospital.state === selectedState
      );
    }

    // ---------- City ----------

    if (selectedCity !== "All") {
      hospitals = hospitals.filter(
        (hospital) =>
          hospital.city === selectedCity
      );
    }

    // ---------- Insurance ----------

    if (selectedInsurance !== "All") {

      hospitals = hospitals.filter((hospital) =>
        hospital.insurance.some(
          (insurance) =>
            insurance === selectedInsurance
        )
      );

    }
    

    // ---------- Recommendation Score ----------

    hospitals = hospitals.map((hospital) => ({

      ...hospital,

      recommendationScore:
        calculateRecommendationScore(
          hospital,
          {
            state: selectedState,
            city: selectedCity,
            insurance: selectedInsurance,
          },
          predictedCost
        ),

    }));

    // ---------- Sorting ----------

    switch (selectedSort) {

      case "Recommendation":

        hospitals.sort(
          (a, b) =>
            b.recommendationScore -
            a.recommendationScore
        );

        break;

      case "Name":

        hospitals.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        break;

      case "CostLow":

        hospitals.sort(
          (a, b) => a.cost - b.cost
        );

        break;

      case "CostHigh":

        hospitals.sort(
          (a, b) => b.cost - a.cost
        );

        break;

      case "Rating":

        hospitals.sort(
          (a, b) => b.rating - a.rating
        );

        break;

      case "PredictedCost": {
        hospitals = filterByPredictedCostRange(
          hospitals,
          predictedCost
        );

        break;
      }

      default:

        break;
    }

    return hospitals;

  }, [
    hospitalData,
    selectedState,
    selectedCity,
    selectedInsurance,
    selectedSort,
    predictedCost,
  ]);

  return (

    <section
      id="hospitals"
      className="py-16 px-6 bg-gray-50 min-h-screen"
    >

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-purple-800 mb-8"
      >
        Recommended Hospitals
      </motion.h2>

      {/* ---------------- Filters ---------------- */}

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-10 flex flex-wrap gap-4">

        {/* Sort */}

        <select
          value={selectedSort}
          onChange={handleSortChange}
          className="border rounded-lg px-4 py-2"
        >
          {SORT_OPTIONS.map((sort) => (
            <option
              key={sort.value}
              value={sort.value}
            >
              {sort.label}
            </option>
          ))}
        </select>

        {/* State */}

        <select
          value={selectedState}
          onChange={handleStateChange}
          className="border rounded-lg px-4 py-2"
        >
          {STATES.map((state) => (
            <option
              key={state}
              value={state}
            >
              {state}
            </option>
          ))}
        </select>

        {/* City */}

        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">
            All Cities
          </option>

          {availableCities.map((city) => (
            <option
              key={city}
              value={city}
            >
              {city}
            </option>
          ))}
        </select>

        {/* Insurance */}

        <select
          value={selectedInsurance}
          onChange={handleInsuranceChange}
          className="border rounded-lg px-4 py-2"
        >
          {INSURANCES.map((insurance) => (
            <option
              key={insurance}
              value={insurance}
            >
              {insurance}
            </option>
          ))}
        </select>

      </div>
            {/* ---------------- Hospital Cards ---------------- */}

      <div className="max-w-7xl mx-auto relative">

        {/* Left Scroll Button */}

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        >
          ◀
        </button>

        {/* Cards */}

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-12 pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >

          {filteredHospitals.length === 0 ? (

            <div className="w-full text-center py-20 text-gray-500 text-lg">
              No hospitals found for the selected filters.
            </div>

          ) : (

            filteredHospitals.map((hospital) => (

              <motion.div
                key={hospital.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="min-w-[320px] max-w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0"
              >

                {/* Image */}

                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />

                {/* Body */}

                <div className="p-5">

                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {hospital.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-1">
                    📍 {hospital.city}, {hospital.state}
                  </p>

                  <p className="text-purple-700 font-semibold mb-1">
                    Estimated Cost
                  </p>

                  <p className="text-lg font-bold mb-3">
                    ₹ {hospital.cost.toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between mb-4">

                    <span className="text-yellow-500 font-semibold">
                      ★ {hospital.rating}
                    </span>

                    {selectedSort === "Recommendation" && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}

                  </div>

                  <div className="flex flex-col gap-2">

                    <a
                      href={hospital.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      View Map
                    </a>

                    <a
                      href={hospital.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Book Appointment
                    </a>

                  </div>

                </div>

              </motion.div>

            ))

          )}

        </div>

        {/* Right Scroll Button */}

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
        >
          ▶
        </button>

      </div>

    </section>

  );

};

export default Hospitals;
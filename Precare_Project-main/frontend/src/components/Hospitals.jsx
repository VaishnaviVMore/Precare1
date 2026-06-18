// src/components/Hospitals.jsx

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// ✅ Import images
import apolloImg from "../assets/hospitals/apollo.jpeg";
import HomiImg from "../assets/hospitals/Homi.jpeg";
import hcgImg from "../assets/hospitals/hcg.jpeg";
import kghImg from "../assets/hospitals/kgh.jpeg";
import lionImg from "../assets/hospitals/lion.jpeg";
import americanImg from "../assets/hospitals/american.jpeg";
import nagaImg from "../assets/hospitals/naga.jpeg";
import yvraoImg from "../assets/hospitals/yvrao.jpeg";
import raviImg from "../assets/hospitals/ravi.jpeg";
import nriImg from "../assets/hospitals/nri.jpeg";
import gghImg from "../assets/hospitals/ggh.jpeg";
import rameshImg from "../assets/hospitals/ramesh.jpeg";
import tirupatiImg from "../assets/hospitals/tirupati.jpeg";
import heliosImg from "../assets/hospitals/helios.jpeg";

// ✅ Image Mapping
const hospitalImages = {
  "Apollo Cancer Centre Visakhapatnam": apolloImg,
  "Homi Bhabha Cancer Hospital & Research Centre": HomiImg,
  "HCG Pinnacle Oncology Centre": hcgImg,
  "King George Hospital Cancer Unit": kghImg,
  "Lions Cancer Treatment & Research Centre": lionImg,
  "American Oncology Institute Vijayawada": americanImg,
  "Apollo Cancer Centre Vijayawada": apolloImg,
  "Nagarjuna Cancer Centre": nagaImg,
  "Dr Y V Rao Cancer Centre": yvraoImg,
  "Ravis American Cancer Care": raviImg,
  "NRI Medical College & General Hospital Oncology Department": nriImg,
  "Government General Hospital Guntur Oncology": gghImg,
  "Ramesh Hospitals Oncology Unit": rameshImg,
  "Apollo Specialty Hospital Tirupati Oncology": tirupatiImg,
  "Helios Hospitals Oncology": heliosImg,
};

const Hospitals = ({ predictedCost }) => {
  const [hospitalData, setHospitalData] = useState([]);

  const [selectedSort, setSelectedSort] = useState("None");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedInsurance, setSelectedInsurance] = useState("All");

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  // ✅ Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://docs.google.com/spreadsheets/d/e/2PACX-1vSys1fOILe-7t5BpvRHZZ7guP4aIk3xwAgKcIX53v3rcYT2trOMRioydJKi65wXmFSEWuOtugNHUHeu/pub?output=csv"
        );

        const text = await res.text();

        const rows = text.split("\n").map((row) =>
          row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
        );
        const headers = rows[0];

        const data = rows.slice(1).map((row, index) => {
          let obj = {};
          headers.forEach((header, i) => {
            obj[header.trim()] = row[i];
          });

          const hospitalName = obj["Hospital Name"]?.trim();

          return {
            id: index + 1,
            name: hospitalName,
            state: obj["State"],
            city: obj["City"],
            cost: parseInt(obj["Treatment cost"]?.split("-")[0]) || 0,
            insurance: obj["Insurance List"]
              ? obj["Insurance List"].split(",")
              : [],
            rating: parseFloat(obj["Rating (1–5)"]) || 4,
            map: obj["Google Map Location Link"] || "#",
            website: obj["Website Link"],
            image:
              hospitalImages[hospitalName] ||
              "https://via.placeholder.com/300",
          };
        });

        setHospitalData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // ✅ Filters
  const uniqueStates = ["All", ...new Set(hospitalData.map((h) => h.state))];

  const uniqueCities = [
    "All",
    ...new Set(
      hospitalData
        .filter((h) => selectedState === "All" || h.state === selectedState)
        .map((h) => h.city)
    ),
  ];

  const uniqueInsurances = [
    "All",
    ...new Set(hospitalData.flatMap((h) => h.insurance)),
  ];

  let filteredHospitals = hospitalData.filter((h) => {
    return (
      (selectedState === "All" || h.state === selectedState) &&
      (selectedCity === "All" || h.city === selectedCity) &&
      (selectedInsurance === "All" ||
        h.insurance.includes(selectedInsurance))
    );
  });

  // ✅ Sorting
  if (selectedSort === "Name")
    filteredHospitals.sort((a, b) => a.name.localeCompare(b.name));

  if (selectedSort === "CostLow")
    filteredHospitals.sort((a, b) => a.cost - b.cost);

  if (selectedSort === "CostHigh")
    filteredHospitals.sort((a, b) => b.cost - a.cost);

  if (selectedSort === "Rating")
    filteredHospitals.sort((a, b) => b.rating - a.rating);

  return (
    <section id="hospitals" className="py-16 px-6 bg-gray-50 min-h-screen">
      <motion.h2 className="text-4xl font-bold text-center text-purple-800 mb-6">
        Recommended Hospitals
      </motion.h2>

      {/* Filters */}
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md mb-8 flex flex-wrap gap-4">
        <select onChange={(e) => setSelectedSort(e.target.value)}>
          <option value="None">Sort</option>
          <option value="Name">Name (A–Z)</option>
          <option value="CostLow">Cost Low → High</option>
          <option value="CostHigh">Cost High → Low</option>
          <option value="Rating">Rating</option>
        </select>

        <select onChange={(e) => setSelectedState(e.target.value)}>
          <option value="All">State</option>
          {uniqueStates.map((state, i) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </select>

        {selectedState !== "All" && (
          <select onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="All">City</option>
            {uniqueCities.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}

        <select onChange={(e) => setSelectedInsurance(e.target.value)}>
          <option value="All">Insurance</option>
          {uniqueInsurances.map((ins, i) => (
            <option key={i} value={ins}>
              {ins}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-10 bg-white px-3 py-2 rounded-full"
        >
          ◀
        </button>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto px-10">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="min-w-[300px] bg-white p-4 rounded-xl shadow"
            >
              <img
                src={hospital.image}
                className="h-40 w-full object-cover rounded-lg"
                alt={hospital.name}
              />

              <h3 className="font-bold mt-2">{hospital.name}</h3>
              <p>
                {hospital.city}, {hospital.state}
              </p>

              <p>₹{hospital.cost}</p>

              <p>⭐ {hospital.rating}</p>

              {/* ✅ Links */}
              <div className="mt-2 flex flex-col gap-1">
                <a
                  href={hospital.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Map
                </a>

                <a
                  href={hospital.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline text-sm"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-10 bg-white px-3 py-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default Hospitals;
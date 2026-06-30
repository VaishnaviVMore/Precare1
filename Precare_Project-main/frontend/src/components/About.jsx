// src/components/About.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ReactComponent as IndiaMap } from "../assets/IndiaMap.svg";

import {
  CheckCircle,
  BarChart3,
  Users,
  Shield,
  Clock,
} from "lucide-react";

/* ---------- Mock / Real-time numbers ---------- */
const IMPACT_NUMBERS = {
  patientsTreated: 1200000,
  newCases: 1800000,
  cancerCenters: 350,
  successRatePercent: 78,
  researchFundingCr: 15000,
  qualifiedOncologists: 8000,
};

const STATE_MARKERS = [
  // -------- STATES (28) --------
  { state: "Maharashtra", centers: 841 },
  { state: "Uttar Pradesh", centers: 336 },
  { state: "Gujarat", centers: 319 },
  { state: "Tamil Nadu", centers: 309 },
  { state: "Karnataka", centers: 306 },
  { state: "West Bengal", centers: 161 },
  { state: "Madhya Pradesh", centers: 147 },
  { state: "Rajasthan", centers: 125 },
  { state: "Punjab", centers: 112 },
  { state: "Andhra Pradesh", centers: 80 },
  { state: "Odisha", centers: 69 },
  { state: "Kerala", centers: 68 },
  { state: "Bihar", centers: 55 },
  { state: "Assam", centers: 45 },
  { state: "Chhattisgarh", centers: 36 },
  { state: "Jharkhand", centers: 26 },
  { state: "Uttarakhand", centers: 21 },
  { state: "Haryana", centers: 169 },
  { state: "Telangana", centers: 187 },
  { state: "Himachal Pradesh", centers: 10 },
  { state: "Goa", centers: 8 },
  { state: "Tripura", centers: 4 },
  { state: "Manipur", centers: 2 },
  { state: "Mizoram", centers: 1 },
  { state: "Nagaland", centers: 1 },
  { state: "Meghalaya", centers: 2 },
  { state: "Arunachal Pradesh", centers: 1 },
  { state: "Sikkim", centers: 1 },

  // -------- UNION TERRITORIES (8) --------
  { state: "Delhi", centers: 261 },
  { state: "Chandigarh", centers: 18 },
  { state: "Jammu and Kashmir", centers: 15 },
  { state: "Ladakh", centers: 1 },
  { state: "Puducherry", centers: 7 },
  { state: "Dadra and Nagar Haveli and Daman and Diu", centers: 2 },
  { state: "Lakshadweep", centers: 1 },
  { state: "Andaman and Nicobar Islands", centers: 2 },
];
/* ---------- small helper: CountUp ---------- */
function useCountUp(target, duration = 1500, step = 30) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const steps = Math.max(10, Math.floor(duration / step));
    const increment = (target - start) / steps;

    let current = start;
    let raf = null;
    let i = 0;

    function tick() {
      i++;
      current += increment;

      if (i >= steps) {
        setValue(Math.round(target));
        cancelAnimationFrame(raf);
        return;
      } else {
        setValue(Math.round(current));
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [target, duration, step]);

  return value;
}

/* -------------------- About Component -------------------- */

const About = () => {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState(null);

  /* NEW STATE FOR SERVICE POPUP */
  const [activeService, setActiveService] = useState(null);

  const stateListRef = useRef(null);

  const stateMarkers = useMemo(() => STATE_MARKERS, []);

  /* Animated Numbers */

  const patientsTreated = useCountUp(
    IMPACT_NUMBERS.patientsTreated,
    2000
  );

  const newCases = useCountUp(
    IMPACT_NUMBERS.newCases,
    2000
  );

  const cancerCenters = useCountUp(
    IMPACT_NUMBERS.cancerCenters,
    2000
  );

  const successRate = useCountUp(
    IMPACT_NUMBERS.successRatePercent,
    2000
  );

  const researchFunding = useCountUp(
    IMPACT_NUMBERS.researchFundingCr,
    2000
  );

  const oncologists = useCountUp(
    IMPACT_NUMBERS.qualifiedOncologists,
    2000
  );

  const filteredStates = stateMarkers.filter((s) =>
    s.state
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  /* ---------- SERVICE INFORMATION ---------- */

  const servicesData = {
    prediction: {
      title: "AI Cost Prediction",
      description:
        "PreCare leverages Artificial Intelligence and Machine Learning to estimate the expected cost of cancer treatment based on patient details, cancer type, treatment stage, and historical healthcare data. It enables patients to prepare financially before starting treatment and supports informed healthcare decisions.",
    },

    hospital: {
      title: "Hospital Recommendation",
      description:
        "Our recommendation system identifies trusted hospitals according to insurance coverage, medical specialization, treatment quality, affordability, and patient location. This allows patients to select the most suitable healthcare provider with confidence and convenience.",
    },

    insights: {
      title: "Treatment Cost Insights",
      description:
        "PreCare provides a detailed visual breakdown of estimated treatment expenses, including consultation fees, diagnostics, medicines, hospitalization, surgery, and follow-up care. These insights help patients understand where treatment costs are distributed.",
    },

    awareness: {
      title: "Cancer Awareness & Guidance",
      description:
        "PreCare promotes cancer awareness by providing reliable educational resources on early detection, prevention, symptoms, treatment options, healthy lifestyle practices, and frequently asked questions. Our goal is to empower patients and families throughout their healthcare journey.",
    },
  };

  const handleSelectState = (stateName) => {
    setSelectedState(stateName);
  };

  const mapRef = useRef(null);
    useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll("path");

    paths.forEach((path) => {
      const stateName = path.getAttribute("data-name");

      if (stateName) {
        path.style.fill = "#dadada";

        if (stateName === selectedState) {
          path.style.fill = "#4f46e5";
        }

        path.onclick = () => handleSelectState(stateName);

        path.onmouseenter = () => {
          if (stateName !== selectedState) {
            path.style.fill = "#ff9800";
          }
        };

        path.onmouseleave = () => {
          if (stateName !== selectedState) {
            path.style.fill = "#dadada";
          }
        };
      }
    });
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState || !stateListRef.current) return;

    const container = stateListRef.current;

    const selectedElement = container.querySelector(
      `[data-state="${selectedState}"]`
    );

    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedState]);

  return (
    <section id="about" className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* ---------------- ABOUT PRECARE ---------------- */}

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row items-center gap-10">

            {/* Doctor Image */}

            <div className="flex-shrink-0 w-full lg:w-1/3">

              <div className="relative group">

                <img
                  src="https://t3.ftcdn.net/jpg/13/95/81/24/360_F_1395812449_i5GaFcGUXoeBJu8pniRFXNQFNWy4aBr2.jpg"
                  alt="Doctor Team"
                  className="w-full rounded-2xl shadow-xl border-4 border-white transition-all duration-500 group-hover:scale-105"
                  style={{ maxHeight: 360 }}
                />

                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 animate-pulse">

                  <Clock className="w-4 h-4" />

                  <span className="font-semibold text-sm">
                    24/7 Support
                  </span>

                </div>

              </div>

            </div>

            {/* About Text */}

            <div className="flex-1 text-center lg:text-left">

              <h2 className="text-4xl font-extrabold text-indigo-800">
                About PreCare
              </h2>

              <p className="mt-2 text-lg italic font-semibold text-purple-600">
                Empowering Every Cancer Journey with Intelligence, Care &
                Confidence.
              </p>

              <div className="w-32 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 my-4 mx-auto lg:mx-0"></div>

              <p className="text-gray-700 text-lg leading-8">
                PreCare is an AI-powered healthcare platform designed to
                simplify cancer treatment planning for patients and their
                families. Our platform combines intelligent treatment cost
                prediction, trusted hospital recommendations, detailed cost
                insights, and awareness resources to support informed medical
                and financial decisions. We strive to make quality cancer care
                more transparent, accessible, and patient-centric.
              </p>

            </div>

          </div>

        </motion.div>

        {/* ---------------- CANCER TREATMENT IMPACT ---------------- */}

        <section className="rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 shadow-lg">

          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-indigo-800 text-center"
          >
            Cancer Treatment Impact in India
          </motion.h3>

          <div className="w-28 h-1 bg-gradient-to-r from-green-500 to-purple-600 mx-auto my-4 rounded-full"></div>
                    {/* ---------- Statistics ---------- */}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">

            <StatCard
              label="Patients Treated"
              value={patientsTreated}
              color="purple"
            />

            <StatCard
              label="New Cases"
              value={newCases}
              color="indigo"
            />

            <StatCard
              label="Centers"
              value={cancerCenters}
              color="green"
            />

            <StatCard
              label="Success Rate"
              value={`${successRate}%`}
              color="pink"
            />

            <StatCard
              label="Funding (Cr)"
              value={`₹${researchFunding}`}
              color="orange"
            />

            <StatCard
              label="Oncologists"
              value={oncologists}
              color="teal"
            />

          </div>

          {/* ---------- India Map ---------- */}

          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">

            <div className="w-full lg:w-[500px] h-[420px] bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">

              <IndiaMap
                ref={mapRef}
                className="w-full max-w-[320px]"
              />

              {selectedState && (

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-indigo-100 rounded-lg px-4 py-3 text-center shadow"
                >

                  <strong className="text-indigo-700">
                    {selectedState}
                  </strong>

                  <p className="text-gray-700 mt-1">
                    This state has{" "}
                    <span className="font-bold text-indigo-700">
                      {
                        stateMarkers.find(
                          (s) => s.state === selectedState
                        )?.centers
                      }
                    </span>{" "}
                    registered cancer centers.
                  </p>

                </motion.div>

              )}

            </div>

            {/* ---------- State List ---------- */}

            <div className="w-full lg:w-[300px] h-[420px] bg-white rounded-xl shadow-lg p-4 flex flex-col">

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search State..."
                className="border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-indigo-300 outline-none"
              />

              <div
                ref={stateListRef}
                className="flex-1 overflow-y-auto divide-y"
              >

                {filteredStates.map((s) => (

                  <button
                    key={s.state}
                    data-state={s.state}
                    onClick={() => handleSelectState(s.state)}
                    className={`w-full flex justify-between px-3 py-2 transition hover:bg-indigo-50 ${
                      selectedState === s.state
                        ? "bg-indigo-100 font-semibold"
                        : ""
                    }`}
                  >

                    <span>{s.state}</span>

                    <span className="text-indigo-700">
                      {s.centers}
                    </span>

                  </button>

                ))}

              </div>

            </div>

          </div>

        </section>
        {/* ---------------- OUR SERVICES ---------------- */}

<section className="rounded-2xl p-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 shadow-lg">

  <h3 className="text-3xl font-bold text-indigo-800 text-center mb-2">
    Our Services
  </h3>

  <p className="text-center text-gray-600 mb-8">
    Intelligent healthcare solutions designed to simplify cancer treatment planning.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* AI Prediction */}

    <div className="relative">

      {activeService === "prediction" && (

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-56 left-0 right-0 bg-white rounded-xl shadow-2xl border border-indigo-200 p-5 z-20"
        >

          <button
            onClick={() => setActiveService(null)}
            className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>

          <h4 className="font-bold text-indigo-700 mb-2">
            {servicesData.prediction.title}
          </h4>

          <p className="text-gray-600 text-sm leading-6">
            {servicesData.prediction.description}
          </p>

        </motion.div>

      )}

      <ServiceCard
        icon={CheckCircle}
        title="AI Cost Prediction"
        text="Predict cancer treatment expenses using AI-powered technology."
        onClick={() =>
          setActiveService(
            activeService === "prediction" ? null : "prediction"
          )
        }
      />

    </div>

    {/* Hospital */}

    <div className="relative">

      {activeService === "hospital" && (

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-56 left-0 right-0 bg-white rounded-xl shadow-2xl border border-indigo-200 p-5 z-20"
        >

          <button
            onClick={() => setActiveService(null)}
            className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>

          <h4 className="font-bold text-indigo-700 mb-2">
            {servicesData.hospital.title}
          </h4>

          <p className="text-gray-600 text-sm leading-6">
            {servicesData.hospital.description}
          </p>

        </motion.div>

      )}

      <ServiceCard
        icon={Users}
        title="Hospital Recommendation"
        text="Discover trusted hospitals based on treatment requirements and location."
        onClick={() =>
          setActiveService(
            activeService === "hospital" ? null : "hospital"
          )
        }
      />

    </div>

    {/* Cost Insights */}

    <div className="relative">

      {activeService === "insights" && (

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-56 left-0 right-0 bg-white rounded-xl shadow-2xl border border-indigo-200 p-5 z-20"
        >

          <button
            onClick={() => setActiveService(null)}
            className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>

          <h4 className="font-bold text-indigo-700 mb-2">
            {servicesData.insights.title}
          </h4>

          <p className="text-gray-600 text-sm leading-6">
            {servicesData.insights.description}
          </p>

        </motion.div>

      )}

      <ServiceCard
        icon={BarChart3}
        title="Treatment Cost Insights"
        text="Visualize treatment expenses through detailed reports and analytics."
        onClick={() =>
          setActiveService(
            activeService === "insights" ? null : "insights"
          )
        }
      />

    </div>

    {/* Awareness */}

    <div className="relative">

      {activeService === "awareness" && (

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-56 left-0 right-0 bg-white rounded-xl shadow-2xl border border-indigo-200 p-5 z-20"
        >

          <button
            onClick={() => setActiveService(null)}
            className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
          >
            ×
          </button>

          <h4 className="font-bold text-indigo-700 mb-2">
            {servicesData.awareness.title}
          </h4>

          <p className="text-gray-600 text-sm leading-6">
            {servicesData.awareness.description}
          </p>

        </motion.div>

      )}

      <ServiceCard
        icon={Shield}
        title="Cancer Awareness"
        text="Learn about prevention, symptoms, treatments, and patient guidance."
        onClick={() =>
          setActiveService(
            activeService === "awareness" ? null : "awareness"
          )
        }
      />

    </div>

  </div>

</section>
{/* ---------------- WHY CHOOSE US ---------------- */}

<section className="rounded-2xl p-8 bg-gradient-to-br from-indigo-50 via-white to-pink-50 shadow-lg">

  <h3 className="text-3xl font-bold text-indigo-800 text-center mb-2">
    Why Choose PreCare?
  </h3>

  <p className="text-center text-gray-600 mb-8">
    Empowering patients with intelligent, reliable, and transparent healthcare solutions.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    <WhyCard
      icon={CheckCircle}
      title="AI-Powered Predictions"
      text="Our advanced AI models estimate cancer treatment costs with high accuracy, helping patients plan their healthcare finances before treatment begins."
    />

    <WhyCard
      icon={Users}
      title="Trusted Hospital Network"
      text="Receive personalized hospital recommendations based on treatment specialization, affordability, quality of care, and your preferred location."
    />

    <WhyCard
      icon={Shield}
      title="Reliable Patient Support"
      text="PreCare prioritizes patient guidance, secure healthcare information, awareness resources, and transparent decision-making throughout the treatment journey."
    />

  </div>

</section>
        {/* ---------- END OF MAIN CONTENT ---------- */}

      </div>
    </section>
  );
};

/* ============================================================
                    HELPER COMPONENTS
============================================================ */
/* ============================================================
                    HELPER COMPONENTS
============================================================ */

const colorMap = {
  purple: "text-purple-600",
  indigo: "text-indigo-600",
  green: "text-green-600",
  pink: "text-pink-600",
  orange: "text-orange-600",
  teal: "text-teal-600",
};

/* ---------- Stat Card ---------- */

const StatCard = ({ label, value, color }) => (
  <motion.div
    initial={{
      opacity: 0,
      scale: 0.9,
    }}
    whileInView={{
      opacity: 1,
      scale: 1,
    }}
    whileHover={{
      y: -8,
      scale: 1.05,
      boxShadow: "0px 18px 35px rgba(79,70,229,0.20)",
    }}
    viewport={{ once: true }}
    transition={{
      duration: 0.8,
      type: "spring",
    }}
    className="cursor-pointer rounded-xl bg-white p-5 shadow-lg"
  >
    <div className={`text-3xl font-bold ${colorMap[color]}`}>
      {value}
    </div>

    <div className="mt-2 text-gray-600 font-medium">
      {label}
    </div>
  </motion.div>
);

/* ---------- Service Card ---------- */

const ServiceCard = ({
  icon: Icon,
  title,
  text,
  onClick,
}) => (
  <motion.div
    whileHover={{
      y: -8,
      scale: 1.04,
      boxShadow: "0px 18px 35px rgba(79,70,229,0.18)",
    }}
    whileTap={{
      scale: 0.97,
    }}
    transition={{
      duration: 0.25,
    }}
    onClick={onClick}
    className="cursor-pointer rounded-xl border border-transparent bg-white p-6 shadow-md hover:border-indigo-300"
  >
    <div className="flex items-start gap-4">

      <div className="rounded-full bg-indigo-100 p-3">

        <Icon className="h-7 w-7 text-indigo-700" />

      </div>

      <div className="flex-1">

        <h4 className="text-lg font-bold text-indigo-800">
          {title}
        </h4>

        <p className="mt-2 text-gray-600 leading-6">
          {text}
        </p>

        <div className="mt-4 text-sm font-semibold text-indigo-600">
          Click to know more →
        </div>

      </div>

    </div>
  </motion.div>
);
/* ---------- Why Choose Card ---------- */

const WhyCard = ({ icon: Icon, title, text }) => (
  <motion.div
    whileHover={{
      y: -10,
      scale: 1.05,
      boxShadow: "0px 20px 40px rgba(79,70,229,0.25)",
    }}
    whileTap={{
      scale: 0.98,
    }}
    transition={{
      duration: 0.3,
    }}
    className="rounded-xl bg-white p-6 text-center border border-transparent hover:border-indigo-300 cursor-pointer"
  >
    <motion.div
      whileHover={{
        rotate: 12,
        scale: 1.15,
      }}
      transition={{
        duration: 0.3,
      }}
      className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100"
    >
      <Icon className="h-8 w-8 text-indigo-700" />
    </motion.div>

    <h4 className="mb-3 text-xl font-bold text-indigo-800">
      {title}
    </h4>

    <p className="leading-7 text-gray-600">
      {text}
    </p>
  </motion.div>
);

/* ============================================================
                        EXPORT
============================================================ */

export default About;
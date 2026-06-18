// src/components/About.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ReactComponent as IndiaMap } from "../assets/IndiaMap.svg";

import {
  CheckCircle,
  BarChart3,
  Users,
  HeartPulse,
  Stethoscope,
  Shield,
  MapPin,
  Clock,
  Award,
  TrendingUp,
  Activity,
  Link as LinkIcon,
  Heart,
} from "lucide-react";

/* ---------- Doctor image (base64 provided by user) ---------- */
const DOCTOR_BASE64 =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...(truncated for brevity)...";




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

const About = () => {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const stateListRef = useRef(null);

  const stateMarkers = useMemo(() => STATE_MARKERS, []);

  // Animated numbers
  const patientsTreated = useCountUp(IMPACT_NUMBERS.patientsTreated, 2000);
  const newCases = useCountUp(IMPACT_NUMBERS.newCases, 2000);
  const cancerCenters = useCountUp(IMPACT_NUMBERS.cancerCenters, 2000);
  const successRate = useCountUp(IMPACT_NUMBERS.successRatePercent, 2000);
  const researchFunding = useCountUp(IMPACT_NUMBERS.researchFundingCr, 2000);
  const oncologists = useCountUp(IMPACT_NUMBERS.qualifiedOncologists, 2000);

  const filteredStates = stateMarkers.filter((s) =>
    s.state.toLowerCase().includes(search.trim().toLowerCase())
  );

  
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
        {/* --- About Section with Doctor image --- */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-md"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-full lg:w-1/3">
              <div className="relative">
                <img
                  src="https://t3.ftcdn.net/jpg/13/95/81/24/360_F_1395812449_i5GaFcGUXoeBJu8pniRFXNQFNWy4aBr2.jpg"
                  alt="Doctor Team"
                  className="w-full h-auto rounded-2xl object-cover shadow-lg border-2 border-purple-100"
                  style={{ maxHeight: 360 }}
                />

                <div className="absolute -top-3 -right-3 bg-green-600 text-white px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                  <Clock className="w-4 h-4" />
                  <div className="text-sm leading-none">24/7 Support</div>
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-4xl font-extrabold text-indigo-800">
                About PreCare
              </h2>
              <div className="w-28 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full my-4 mx-auto lg:mx-0"></div>

              <p className="text-gray-700 leading-relaxed">
                PreCare is your healthcare companion designed to simplify
                treatment journeys. We combine AI-driven cost estimates, trusted
                hospital recommendations, and patient support so families can
                plan confidently.
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- Cancer Treatment Impact Section --- */}
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

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            <StatCard label="Patients Treated" value={patientsTreated} color="purple" />
            <StatCard label="New Cases" value={newCases} color="indigo" />
            <StatCard label="Centers" value={cancerCenters} color="green" />
            <StatCard label="Success Rate" value={`${successRate}%`} color="pink" />
            <StatCard label="Funding (Cr)" value={`₹${researchFunding}`} color="orange" />
            <StatCard label="Oncologists" value={oncologists} color="teal" />
          </div>


        
        
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">

            {/* ✅ MAP SECTION */}
            
            
              <div className="w-full lg:w-[500px] h-[420px] bg-white rounded-xl p-4 shadow-md flex flex-col items-center justify-center">
            
            <IndiaMap
              ref={mapRef}
             className="w-full max-w-[320px]" 
            />

              {/* Selected State Info */}
              {selectedState && (
                <div className="mt-4 p-3 bg-indigo-100 rounded-lg text-center">
                  <strong>{selectedState}</strong> has{" "}
                  {stateMarkers.find(s => s.state === selectedState)?.centers} cancer centers
                </div>
              )}

            </div>

            {/* ✅ STATE LIST */}
              <div className="w-full lg:w-[300px] h-[420px] bg-white rounded-xl p-4 shadow-md flex flex-col">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search state..."
                className="w-full px-3 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-purple-300"
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
                    className={`w-full px-3 py-2 flex justify-between hover:bg-indigo-50 ${
                      selectedState === s.state ? "bg-indigo-100" : ""
                    }`}
                  >
                    <span>{s.state}</span>
                    <span>{s.centers} centers</span>
                  </button>
                ))}
              </div>

            </div>
          </div>
          
         
        </section>

        {/* --- Benefits of Treatment --- */}
        <section className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-2xl p-10 shadow-lg">
          <h3 className="text-3xl font-bold text-indigo-800 text-center">
            Benefits of Our Treatment
          </h3>
          <div className="w-28 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto my-4 rounded-full"></div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-12 gap-10 relative">
            {[
              { step: "Early Detection", icon: Activity },
              { step: "Personalized Plans", icon: Users },
              { step: "Advanced Technology", icon: CheckCircle },
              { step: "Improved Recovery", icon: Heart },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <item.icon className="w-8 h-8" />
                </div>
                <p className="mt-3 text-indigo-700 font-semibold">{item.step}</p>
              </motion.div>
            ))}

            {/* Animated Lines */}
            <div className="hidden md:flex absolute top-[60px] left-0 right-0 justify-between px-24 z-0">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-1/4 h-1 rounded-full bg-gradient-to-r from-indigo-400 via-pink-400 to-indigo-400 animate-shimmer"
                ></div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Our Services --- */}
        <section className="rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-purple-50 shadow-md">
          <h3 className="text-3xl font-bold text-indigo-800 text-center mb-6">
            Our Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard icon={CheckCircle} title="AI Predictions" text="Accurate AI-driven cost estimation." />
            <ServiceCard icon={Users} title="Trusted Doctors" text="Network of verified specialists." />
            <ServiceCard icon={BarChart3} title="Cost Insights" text="Visual breakdowns and reports." />
            <ServiceCard icon={Shield} title="Secure Platform" text="Patient privacy ensured." />
          </div>
        </section>

        {/* --- Why Choose Us --- */}
        <section className="rounded-2xl p-8 bg-gradient-to-br from-indigo-50 to-pink-50 shadow-md">
          <h3 className="text-3xl font-bold text-indigo-800 text-center mb-6">
            Why Choose Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <WhyCard icon={HeartPulse} text="Patient-first approach with 24/7 care." />
            <WhyCard icon={Stethoscope} text="Experienced oncologists & specialists." />
            <WhyCard icon={Award} text="Recognized by top medical institutions." />
          </div>
        </section>
      </div>
    </section>
  );
};

/* --- Helper Components --- */
const StatCard = ({ label, value, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-xl shadow text-center">
    <div className={`text-2xl font-bold text-${color}-600`}>{value}+</div>
    <div className="text-sm text-gray-600">{label}</div>
  </motion.div>
);

const ServiceCard = ({ icon: Icon, title, text }) => (
  <div className="rounded-xl bg-white p-6 shadow-sm">
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6 text-indigo-600" />
      <div>
        <div className="font-semibold text-indigo-800">{title}</div>
        <div className="text-sm text-gray-600">{text}</div>
      </div>
    </div>
  </div>
);

const WhyCard = ({ icon: Icon, text }) => (
  <div className="rounded-xl bg-white p-6 shadow-sm text-center">
    <Icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
    <p className="text-gray-700">{text}</p>
  </div>
);

export default About;
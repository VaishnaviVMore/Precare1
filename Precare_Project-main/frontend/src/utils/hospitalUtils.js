// ===============================
// hospitalUtils.js
// Hospital Recommendation Helpers
// ===============================

// -------------------------------
// States
// -------------------------------

export const STATES = [
  "All",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// -------------------------------
// Sort Options
// -------------------------------

export const SORT_OPTIONS = [
  {
    value: "Recommendation",
    label: "Recommended",
  },
  {
    value: "Name",
    label: "Name (A-Z)",
  },
  {
    value: "CostLow",
    label: "Cost Low → High",
  },
  {
    value: "CostHigh",
    label: "Cost High → Low",
  },
  {
    value: "Rating",
    label: "Highest Rating",
  },
  {
  value: "PredictedCost",
  label: "Predicted Cost",
  },
];

// -------------------------------
// Insurance List
// -------------------------------

export const INSURANCES = [
  "All",

  "Ayushman Bharat",

  "CGHS",

  "ESIC",

  "ECHS",

  "YSR Aarogyasri",

  "CMAAY",

  "Government Insurance",

  "Government Schemes",

  "Private Insurance",

  "Star Health",

  "HDFC ERGO",

  "ICICI Lombard",

  "Apollo Munich",

  "Bajaj Allianz",

  "Aditya Birla Health Insurance",

  "Niva Bupa",

  "Care Health Insurance",

  "New India Assurance",

  "Mediclaim"
];

// -------------------------------
// Insurance Alias Mapping
// -------------------------------

export const INSURANCE_ALIASES = {

  "star health insurance":"Star Health",

  "star health":"Star Health",

  "star health insurance ltd":"Star Health",

  "hdfc ergo":"HDFC ERGO",

  "hdfc ergo health insurance":"HDFC ERGO",

  "icici lombard":"ICICI Lombard",

  "icici lombard health insurance":"ICICI Lombard",

  "apollo munich":"Apollo Munich",

  "apollo munich health insurance":"Apollo Munich",

  "bajaj allianz":"Bajaj Allianz",

  "bajaj allianz health insurance":"Bajaj Allianz",

  "aditya birla": "Aditya Birla Health Insurance",
   
  "aditya birla health insurance": "Aditya Birla Health Insurance",

  "religare": "Care Health Insurance",

  "care health": "Care Health Insurance",

  "care health insurance": "Care Health Insurance",
  
  "max bupa":"Niva Bupa",

  "niva bupa":"Niva Bupa",

  "new india assurance":"New India Assurance",

  "mediclaim":"Mediclaim",

  "govt insurance":"Government Insurance",

  "government insurance":"Government Insurance",

  "government scheme":"Government Schemes",

  "government schemes":"Government Schemes",

  "private insurance":"Private Insurance",

  "ysr aarogyasri":"YSR Aarogyasri",

  "aarogyasri":"YSR Aarogyasri"

};

// -------------------------------
// State -> City Mapping
// -------------------------------

export const STATE_CITY_MAP = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Tirupati",
    "Kurnool",
  ],

  "Arunachal Pradesh": [
    "Itanagar",
    "Naharlagun",
    "Pasighat",
    "Tawang",
    "Ziro",
  ],

  "Assam": [
    "Guwahati",
    "Silchar",
    "Dibrugarh",
    "Jorhat",
    "Tezpur",
  ],

  "Bihar": [
    "Patna",
    "Muzaffarpur",
    "Gaya",
    "Bhagalpur",
    "Darbhanga",
  ],

  "Chhattisgarh": [
    "Raipur",
    "Bilaspur",
    "Bhilai",
    "Korba",
    "Raigarh",
  ],

  "Goa": [
    "Panaji",
    "Margao",
    "Mapusa",
    "Vasco da Gama",
    "Porvorim",
  ],

  "Gujarat": [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Gandhinagar",
  ],

  "Haryana": [
    "Gurugram",
    "Faridabad",
    "Rohtak",
    "Hisar",
    "Panchkula",
  ],

  "Himachal Pradesh": [
    "Shimla",
    "Kangra",
    "Mandi",
    "Hamirpur",
    "Solan",
  ],

  "Jharkhand": [
    "Ranchi",
    "Jamshedpur",
  ],

  "Karnataka": [
    "Bengaluru",
  ],

  "Kerala": [
    "Thiruvananthapuram",
    "Kochi",
  ],

  "Madhya Pradesh": [
    "Indore",
    "Bhopal",
  ],

  "Maharashtra": [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Kolhapur",
  ],

  "Manipur": [
    "Imphal",
  ],

  "Meghalaya": [
    "Shillong",
  ],

  "Mizoram": [
    "Aizawl",
  ],

  "Nagaland": [
    "Kohima",
    "Dimapur",
  ],

  "Odisha": [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
  ],

  "Punjab": [
    "Chandigarh",
    "Mohali",
    "Ludhiana",
  ],

  "Rajasthan": [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Ajmer",
  ],

  "Sikkim": [
    "Gangtok",
    "Namchi",
    "Singtam",
  ],

  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Trichy",
    "Salem",
  ],

  "Telangana": [
    "Hyderabad",
  ],

  "Tripura": [
    "Agartala",
  ],

  "Uttar Pradesh": [
    "Lucknow",
    "Varanasi",
    "Ghaziabad",
  ],

  "Uttarakhand": [
    "Dehradun",
  ],

  "West Bengal": [
    "Kolkata",
  ],
};

// -------------------------------
// City -> State Mapping
// -------------------------------

export const CITY_STATE_MAP = {};

Object.entries(STATE_CITY_MAP).forEach(([state, cities]) => {
  cities.forEach((city) => {
    CITY_STATE_MAP[city] = state;
  });
});

// -------------------------------
// Normalize Text
// -------------------------------

export const normalizeText = (text = "") => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
};

// -------------------------------
// Normalize Insurance
// -------------------------------

export const normalizeInsurance = (insurance = "") => {
  const normalized = normalizeText(insurance);
  return INSURANCE_ALIASES[normalized] || insurance.trim();
};

// -------------------------------
// Parse Insurance List
// -------------------------------

export const parseInsuranceList = (insuranceString = "") => {
  if (!insuranceString) return [];

  return insuranceString
    .split(/[,;|]+/)
    .map((item) => normalizeInsurance(item))
    .filter((item) => item !== "");
};

// -------------------------------
// Parse Treatment Cost
// -------------------------------

export const parseCost = (cost = "") => {
  if (!cost) return 0;

  const value = cost
    .toString()
    .split("-")[0]
    .replace(/[₹,\s]/g, "");

  return Number(value) || 0;
};

// -------------------------------
// Recommendation Score
// -------------------------------

export const calculateRecommendationScore = (
  hospital,
  filters,
  predictedCost
) => {
  let score = 0;

  if (
    filters.state !== "All" &&
    hospital.state === filters.state
  ) {
    score += 40;
  }

  if (
    filters.city !== "All" &&
    hospital.city === filters.city
  ) {
    score += 60;
  }

  if (
    filters.insurance !== "All" &&
    hospital.insurance.includes(filters.insurance)
  ) {
    score += 50;
  }

  if (predictedCost && hospital.cost) {
    const difference = Math.abs(hospital.cost - predictedCost);

    if (difference <= 50000) score += 30;
    else if (difference <= 100000) score += 20;
    else if (difference <= 200000) score += 10;
  }

  score += hospital.rating * 5;

  return score;
};

// -------------------------------
// Prediction  Score
// ------------------------------

export const filterByPredictedCostRange = (
  hospitals,
  predictedCost
) => {
  if (!predictedCost) return hospitals;

  const primaryLower = predictedCost - 100000; // 6L
  const primaryUpper = predictedCost + 100000; // 8L

  const secondaryLower = predictedCost - 200000; // 5L
  const secondaryUpper = predictedCost + 200000; // 9L

  // First try: strict range (±1 lakh)
  const primary = hospitals.filter(
    (h) =>
      h.cost >= primaryLower &&
      h.cost <= primaryUpper
  );

  if (primary.length > 0) {
    return primary;
  }

  // Fallback: wider range (±2 lakh)
  return hospitals.filter(
    (h) =>
      h.cost >= secondaryLower &&
      h.cost <= secondaryUpper
  );
};
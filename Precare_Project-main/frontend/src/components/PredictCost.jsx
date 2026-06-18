import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeartbeat, FaDownload } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PredictCost = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    cancerType: "",
    stage: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const pdfRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const stageMap = {
        1: "Stage I",
        2: "Stage II",
        3: "Stage III",
        4: "Stage IV",
      };

      const res = await axios.post("http://127.0.0.1:5000/predict", {
        age: Number(formData.age),
        gender: formData.gender === "male" ? "Male" : "Female",
        cancer_type:
          formData.cancerType.charAt(0).toUpperCase() +
          formData.cancerType.slice(1),
        cancer_stage: stageMap[formData.stage],
        smoking: "No",
      });

      setResult(res.data.estimated_cost);
      setShowPopup(true);
    } catch (error) {
      console.error(error);
      setResult("Error fetching prediction");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const breakdown =
    result && !isNaN(result)
      ? {
          Consultation: result * 0.1,
          Surgery: result * 0.4,
          Medication: result * 0.3,
          Hospital: result * 0.2,
        }
      : null;

  const chartData = breakdown
    ? {
        labels: Object.keys(breakdown),
        datasets: [
          {
            label: "Cost Breakdown (₹)",
            data: Object.values(breakdown),
          },
        ],
      }
    : null;

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("cost_report.pdf");
  };

  return (
    <section id="predict" className="p-12 bg-white min-h-screen">

      {/* FORM */}
      <div className="max-w-3xl mx-auto bg-gray-50 shadow-lg rounded-2xl p-8">
        <motion.h1
          className="text-3xl font-bold text-center mb-8 text-blue-700 flex items-center justify-center gap-3"
        >
          <FaHeartbeat className="text-red-500" /> Predict Treatment Cost
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-left font-semibold mb-2">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
          <label className="block text-left font-semibold mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label className="block text-left font-semibold mb-2"> Cancer Type </label>
          <select
            name="cancerType"
            value={formData.cancerType}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Cancer Type</option>
            <option value="lung">Lung Cancer</option>
            <option value="breast">Breast Cancer</option>
            <option value="prostate">Prostate Cancer</option>
            <option value="colon">Colon Cancer</option>
            <option value="blood">Blood Cancer</option>
          </select>
          <label className="block text-left font-semibold mb-2"> Cancer Stage </label>
          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Stage</option>
            <option value="1">Stage I</option>
            <option value="2">Stage II</option>
            <option value="3">Stage III</option>
            <option value="4">Stage IV</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {loading ? "Predicting..." : "Predict Cost"}
          </button>
        </form>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {showPopup && result && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
              <h2 className="text-xl font-semibold mb-4">Predicted Cost</h2>
              <p className="text-2xl font-bold text-green-600">
                ₹{result.toLocaleString()}
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI OUTPUT (NO INPUT BOX HERE) */}
      {result && !isNaN(result) && (
        <div className="max-w-3xl mx-auto mt-10 bg-gray-50 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">
            Cost Breakdown
          </h2>

          <p className="text-center text-green-600 font-bold mb-4">
            Total Predicted Cost: ₹{result.toLocaleString()}
          </p>

          {chartData && <Bar data={chartData} />}

          <div className="flex justify-center mt-6">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              <FaDownload /> Download PDF
            </button>
          </div>
        </div>
      )}

      {/* ✅ HIDDEN PDF CONTENT */}
      <div
        ref={pdfRef}
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "800px",
          background: "white",
          padding: "20px",
        }}
      >
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-xl shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-2">User Report</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <p><strong>Cancer Type:</strong> {formData.cancerType}</p>
            <p><strong>Stage:</strong> {formData.stage}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">
          Cost Breakdown
        </h2>

        <p className="text-center text-green-600 font-bold mb-4">
          Total Predicted Cost: ₹{result?.toLocaleString()}
        </p>

        {chartData && <Bar data={chartData} />}
      </div>
    </section>
  );
};

export default PredictCost;
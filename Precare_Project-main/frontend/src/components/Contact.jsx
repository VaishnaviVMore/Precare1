import React, { useState } from "react";
import { Instagram } from "lucide-react";
import thankYouImg from "../assets/thankyou.png"; // ✅ import your image

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: ""
  });

  const [submitted, setSubmitted] = useState(false); // ✅ new state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.feedback
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true); // ✅ show image instead of form
      } else {
        alert("Error: " + data.error);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section id="contact" className="py-12 bg-purple-50">
      <div className="container mx-auto px-6">

        {/* Title */}
        <h2 className="text-center text-purple-800 text-3xl font-bold mb-8">
          Contact Us
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-green-500 mx-auto mt-2 rounded-full"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-purple-100">

          {/* Left Info */}
          <div className="space-y-5 p-4">
            <p className="text-gray-700">
              <span className="font-bold text-purple-700">📍 Address:</span><br />
              PreCare Predict HQ, Pune, Maharashtra, India
            </p>

            <p className="text-gray-700">
              <span className="font-bold text-purple-700">📞 Phone:</span><br />
              +91 9876543210
            </p>

            <p className="text-gray-700">
              <span className="font-bold text-purple-700">📧 Email:</span><br />
              support@precared.com
            </p>

            <p className="flex items-center gap-2 text-gray-700">
              <Instagram className="text-pink-500" size={18} />
              <span>
                <strong className="text-purple-700">Instagram:</strong>{" "}
                <a
                  href="https://www.instagram.com/precarehq?igsh=MWd2ZjAxZHV3bGw0aw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline"
                >
                  @PreCareHQ
                </a>
              </span>
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center bg-purple-50 p-6 rounded-xl shadow-md border border-purple-100">

            {!submitted ? (
              // ✅ FORM
              <form className="space-y-4 w-full" onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />

                <textarea
                  name="feedback"
                  placeholder="Your Feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  rows="4"
                  required
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition shadow-md"
                >
                  Submit Feedback
                </button>

              </form>
            ) : (
              // ✅ THANK YOU IMAGE
              <div className="flex flex-col items-center justify-center text-center">
                <img
                  src={thankYouImg}
                  alt="Thank You"
                  className="max-w-xs w-full h-auto"
                />
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
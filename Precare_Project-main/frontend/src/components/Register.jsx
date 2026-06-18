// src/components/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LoginImage from "../assets/LoginImage.png";
import logo from "../assets/logo.png"; // ✅ added logo import

function Register({ setUser }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    agreeTerms: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Manual Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.agreeTerms) {
      setError("You must agree to the terms and privacy policy.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      setUser(res.data.user);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  // ✅ Google Register/Login
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const userData = {
        username: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        googleId: decoded.sub,
      };

      await axios.post("http://localhost:5000/api/google-login", userData);

      setUser(userData);
      navigate("/");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Image */}
      <div className="w-1/2 h-full overflow-hidden">
        <img
          src={LoginImage}
          alt="Register"
          className="w-full h-full object-cover object-[center_35%]"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full flex items-center justify-center bg-gradient-to-r from-[#01030a] via-[#081a3a] to-[#dbeafe]">

        <div className="w-full max-w-md bg-white border border-blue-200 rounded-2xl p-10 shadow-xl">

        
          {/* Logo */}
            <div className="flex justify-center mb-3">
                      <img src={logo} alt="logo" className="w-20 h-20 rounded-full" />
            </div>

          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">
            Sign Up
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="User name"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            {/* Terms */}
            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                className="mr-2 mt-1"
              />
              <span>
                By creating an account, I agree to our{" "}
                <span className="underline cursor-pointer">Terms of use</span>{" "}
                and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full hover:opacity-90 transition"
            >
              Create an account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

         
                    {/* Google Login */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => setError("Google login failed")}
                shape="pill"
                theme="outline"
                size="large"
              />
            </div>
</div>

          {/* Login Link */}
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
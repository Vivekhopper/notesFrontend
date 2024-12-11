// src/pages/Login.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../Context/ContextProvider";
import {toast} from "react-toastify"
import confetti from "canvas-confetti";

const LoginForm = () => {
  const {login}=useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
const navigate=useNavigate()
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("https://notesbackend-drfi.onrender.com/api/auth/login", {
     
        email: formData.email,
        password: formData.password,
      });
      if(res.data.success){
        login(res.data.user)
        localStorage.setItem("token",res.data.token)
        toast.success("Login Successfull");
        navigate('/home')
        confetti({
          particleCount: 1500,
          spread: 150,
          origin: { y: 0.6 },
        });
      }
    }
    catch(err){
    }
  };

  return (
    <form
      className="flex items-center justify-center p-4 min-h-screen"
      onSubmit={handleSubmit}
    >
      <motion.div
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Login
        </h2>

        <div className="space-y-4">
          {/* Username Field */}
          <motion.div
            className="space-y-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <label className="block text-blue-600 font-medium transition duration-300">
              Username
            </label>
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
              placeholder="Enter your username"
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="relative space-y-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <label className="block text-blue-600 font-medium transition duration-300">
              Password
            </label>
            <motion.input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
              placeholder="Enter your password"
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </motion.div>
        </div>

        <motion.button
          className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </form>
  );
};

export default LoginForm;

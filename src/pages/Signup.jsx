import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const navigate=useNavigate()
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleForm = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
    const res = await axios.post("https://notes-backend.vercel.app/api/auth/register", {
  username: formData.username,
  email: formData.email,
  password: formData.password,
});
      console.log(res);
      alert("Account created successfully!");
      if(res.data.success){
        navigate('/login')
      }
      // Redirect or perform additional actions here
    } catch (err) {
      console.log(err);
      alert("Failed to sign up. Please try again."); 
    }
  };


  return (
    <form
      className="flex items-center justify-center p-4 min-h-screen"
      onSubmit={handleForm}
    >
      <motion.div
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Sign Up
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
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
              placeholder="Enter your username"
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="space-y-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <label className="block text-blue-600 font-medium transition duration-300">
              Email
            </label>
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
              placeholder="Enter your email"
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="relative space-y-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
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

          {/* Confirm Password Field */}
          <motion.div
            className="relative space-y-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <label className="block text-blue-600 font-medium transition duration-300">
              Confirm Password
            </label>
            <motion.input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-blue-400 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
              placeholder="Confirm your password"
              whileFocus={{ scale: 1.02 }}
              whileHover={{ scale: 1.01 }}
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </motion.div>
        </div>
        <motion.button
          className="w-full py-3 mt-6 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Up
        </motion.button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </form>
  );
};

export default SignupForm;

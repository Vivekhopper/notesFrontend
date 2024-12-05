import React from "react";
import { motion } from "framer-motion";
import deathnote from "../assets/homeimg.jpg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
function FHome() {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `url(${deathnote})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Centered Content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold drop-shadow-lg"
            whileHover={{ scale: 1.1, color: "#6366F1" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Welcome to NoteApp
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl drop-shadow-lg max-w-md"
            whileHover={{ scale: 1.05, color: "#A5B4FC" }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            Your one-stop solution for managing your notes effortlessly!
          </motion.p>
          <motion.button
            className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg transition"
            whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>navigate('/login')}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default FHome;

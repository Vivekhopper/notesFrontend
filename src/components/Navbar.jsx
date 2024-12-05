// Navbar.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/ContextProvider";
import Swal from "sweetalert2";
function Navbar({ setQuery }) {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user ? user.username : null); // State for username
  const navigate = useNavigate();

  // Use useEffect to update the username when user changes
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUsername(JSON.parse(storedUser).username); // Get username from localStorage
      } else {
        setUsername(null); // Clear username if not found
      }
    }
  }, [user]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout actions
        logout();
        localStorage.removeItem("user"); // Clear user from localStorage on logout
        navigate("/");
  
        // Show a success message
        Swal.fire("Logged Out", "You have been successfully logged out.", "success");
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg p-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-white font-bold text-xl cursor-pointer"
        >
          <Link to="/">NoteApp</Link>
        </motion.div>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:block w-1/3 relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {user ? (
          <motion.input
            type="text"
            placeholder="Search..."
            whileFocus={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full px-4 py-2 rounded-lg shadow-inner focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
         ):(
            <div></div>
         )
        }
        </motion.div>
        {/* User Info and Buttons */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <motion.div>
                <Link
                  to="/login"
                  className="bg-white text-indigo-500 px-4 py-2 rounded-lg shadow-md"
                >
                  Login
                </Link>
              </motion.div>
              <motion.div>
                <Link
                  to="/signup"
                  className="bg-white text-indigo-500 px-4 py-2 rounded-lg shadow-md"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div className="text-white font-medium">
                {username} {/* Display username */}
              </motion.div>
              <motion.div>
                <button
                  onClick={handleLogout}
                  className="bg-white text-indigo-500 px-4 py-2 rounded-lg shadow-md"
                >
                  Logout
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;

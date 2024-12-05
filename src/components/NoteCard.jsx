import React from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import deathnote from "../assets/cardimg.jpg";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";

export default function NoteCard({ note, onedit, deleteNode }) {

  // Function to handle deletion with SweetAlert and confetti
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deleteNode function to delete the note
        deleteNode(id);

        // Trigger confetti after successful deletion
       

        Swal.fire(
          "Deleted!",
          "Your note has been deleted.",
          "success"
        );

        confetti({
          particleCount: 600,
          spread: 150,
          origin: { y: 0.3 },
        });
      }
    });
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 max-w-xs m-4 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Background with reduced opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${deathnote})`,
          opacity: 0.2, // Adjust the opacity as needed
        }}
      ></div>

      {/* Content Section */}
      <div className="relative z-10 text-white">
        <h3 className="text-xl font-semibold text-indigo-700 mb-2">{note.title}</h3>
        <p className="text-gray-600 mb-4">{note.description}</p>
        
        <div className="flex justify-end space-x-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.2, color: "#4f46e5" }}
            transition={{ duration: 0.3 }}
            className="text-indigo-500 hover:text-indigo-700"
            onClick={() => onedit(note)}
          >
            <FaEdit size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2, color: "#f87171" }}
            transition={{ duration: 0.3 }}
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(note._id)} // Use handleDelete instead of directly calling deleteNode
          >
            <FaTrash size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

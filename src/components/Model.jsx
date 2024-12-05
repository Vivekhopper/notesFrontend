import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Model({ toCloseModel, addNote, currentNode,editNote }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNode) {
      editNote(currentNode._id,title,description)
    } else {
      addNote(title, description);
    }
  };
  useEffect(() => {
    if (currentNode) {
      setTitle(currentNode.title);
      setDescription(currentNode.description);
    }
  }, [currentNode]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {currentNode ? "Edit Note" : "Add Note"}
        </h2>

        {/* Title Input */}
        <motion.div whileFocus={{ scale: 1.05 }} className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Description Input */}
        <motion.div whileFocus={{ scale: 1.05 }} className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </motion.div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded-lg"
            type="button"
            onClick={() => toCloseModel()}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md"
            type="submit"
          >
            {currentNode ? "Update Note" : "Add Note"}
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default Model;

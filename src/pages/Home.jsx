import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Model from "../components/Model";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import {toast} from "react-toastify"
import Hdeath from '../assets/169166.jpg'
import confetti from "canvas-confetti";
function Home() {
  const [isModelOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [filteredRecords, setfilteredRecords] = useState(false);
  const [query, setQuery] = useState("");
  const toCloseModel = () => {
    setModelOpen(false);
  };

  const addNote = async (title, description) => {
    try {
      const res = await axios.post(
        "notes-backend.vercel.app/api/auth/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Note added successfully!");
        toCloseModel();
        fetchNotes(); // Refetch notes after adding a new one
      } else {
        alert("Failed to add note.");
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        alert(`Error: ${err.response.data.message || "Failed to add note."}`);
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("notes-backend.vercel.app/api/auth/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };
  const editNote = async (id, title, description) => {
    try {
      const res = await axios.put(
        `notes-backend.vercel.app/api/auth/edit/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (res.data.success) {
        // Trigger confetti after a successful update
        confetti({
          particleCount: 500,
          spread: 150,
          origin: { y: 0.6 },
        });
  
        toast.success("Note updated successfully!");
        toCloseModel();
        await fetchNotes(); // Refetch notes after updating one
      } else {
        alert("Failed to update note.");
      }
    } catch (err) {
      console.error("Error updating note:", err);
      if (err.response) {
        alert(
          `Error: ${err.response.data.message || "Failed to update note."}`
        );
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  const deleteNode = async (id) => {
    try {
      const res = await axios.delete(
        `notes-backend.vercel.app/api/auth/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
      
        await fetchNotes(); // Refetch notes after deleting one
      } else {
        alert("Failed to delete note.");
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      if (err.response) {
        alert(
          `Error: ${err.response.data.message || "Failed to delete note."}`
        );
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  const onedit = (note) => {
    setCurrentNode(note);
    setModelOpen(true);
  };
  useEffect(() => {
    setfilteredRecords(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  return (
    <div
    className="bg-gray-100 min-h-screen relative"
    style={{
      backgroundImage: `url(${Hdeath})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    {/* Content */}
    <div className="relative z-10">
      <Navbar setQuery={setQuery} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onedit={onedit}
                deleteNode={deleteNode}
              />
            ))
          ) : (
            <p className="text-white text-center text-lg">No Notes</p>
          )}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setModelOpen(true)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition"
          >
            Add Note
          </button>
        </div>
      </div>
      {isModelOpen && (
        <Model
          toCloseModel={toCloseModel}
          addNote={addNote}
          currentNode={currentNode}
          editNote={editNote}
        />
      )}
    </div>
  </div>
  );
}

export default Home;

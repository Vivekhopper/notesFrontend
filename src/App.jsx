import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './pages/Signup';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import FHome from './pages/FHome';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/home" element={<Home />} /> 
          <Route path="/" element={<FHome />} /> 
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/welcome";

const App = () => {
  const isLoggedIn = sessionStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/welcome" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={isLoggedIn ? <Welcome /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

// src/components/Welcome.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "./Welcome.css";

const Welcome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">DB2 Catalog Viewer</header>

      <main className="welcome-main">
        <h2>Welcome!</h2>
        {/* Add more content here if needed */}
      </main>

      <div className="bottom-menu">
        <div className="logout-icon" onClick={() => setShowPopup(true)}>
          <FiLogOut size={24} title="Logout" />
        </div>
      </div>

      {showPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <p>Are you sure you want to logout?</p>
            <button onClick={handleLogout}>Yes, Logout</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;

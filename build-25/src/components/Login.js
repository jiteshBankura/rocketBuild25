// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // 🧭 React Router navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://rs28:59313/ws/security/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();

      // Save token
      sessionStorage.setItem("accessToken", data.accessToken || "dummy_token");

      // ✅ Navigate to Welcome screen
      navigate("/welcome");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <label>
          ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;

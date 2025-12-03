import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg("");

    if (!username.trim() || !password.trim()) {
      setErrorMsg("All fields are required");
      return;
    }

    try {
     const res = await api.post("/admin/login", { username, password });
localStorage.setItem("token", res.data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Invalid admin credentials");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-card">

        <h2 className="admin-title">Admin Login</h2>

        {errorMsg && <div className="admin-error">{errorMsg}</div>}

        <input
          className="admin-input"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="admin-input"
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="admin-btn" onClick={handleLogin}>
          Login
        </button>

        <button className="admin-back" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

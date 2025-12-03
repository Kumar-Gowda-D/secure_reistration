// import { useState } from "react";
// import { api } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("teamA");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
  
//   const handleLogin = async () => {
//     try {
//       const res = await api.post("/auth/login", { username, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/register");
//     } catch (err) {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto" }}>
//       <h2>Team A Login</h2>

//       <input 
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <input 
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ width: "100%", padding: 10, marginBottom: 10 }}
//       />

//       <button onClick={handleLogin} style={{ padding: 10, width: "100%" }}>
//         Login
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("teamA");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username.trim()) {
      setErrorMsg("Username is required");
      return false;
    }
    if (!password.trim()) {
      setErrorMsg("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setErrorMsg("");

    if (!validateForm()) return;

    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/register");
    } catch (err) {
      setErrorMsg("Invalid username or password");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">
        <h2 className="login-title">Team A Login</h2>

        {errorMsg && <div className="error-msg">{errorMsg}</div>}

        <input
          className="input-box"
          placeholder="Enter username (ex: teamA)"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMsg("");     // clear error while typing
          }}
        />

        <input
          className="input-box"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg("");     // clear error while typing
          }}
        />

        <button className="btn login-btn" onClick={handleLogin}>
          Login
        </button>

        <button className="btn back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

    </div>
  );
}

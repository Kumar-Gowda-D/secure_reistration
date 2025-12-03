// // import { useState } from "react";
// // import { api } from "../api";
// // import { useNavigate } from "react-router-dom";

// // export default function TeamBLogin() {
// //   const [username, setUsername] = useState("teamB1");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async () => {
// //     try {
// //       const res = await api.post("/auth/login", { username, password });
// //       localStorage.setItem("token", res.data.token);
// //       navigate("/teamb/dashboard");
// //     } catch (err) {
// //       alert(err.response?.data?.error || "Invalid username or password");
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
// //       <h2>Team B Login</h2>

// //       <input
// //         value={username}
// //         onChange={(e) => setUsername(e.target.value)}
// //         placeholder="Enter team username"
// //         style={{ width: "100%", padding: 10, margin: 8 }}
// //       />

// //       <input
// //         type="password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //         placeholder="Enter password"
// //         style={{ width: "100%", padding: 10, margin: 8 }}
// //       />

// //       <button
// //         onClick={handleLogin}
// //         style={{
// //           width: "100%",
// //           padding: 10,
// //           marginTop: 8,
// //           background: "blue",
// //           color: "white",
// //           border: "none",
// //           borderRadius: 5,
// //         }}
// //       >
// //         Login
// //       </button>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { api } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function TeamBLogin() {
//   const [username, setUsername] = useState("teamB1");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await api.post("/auth/login", { username, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/teamb/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.error || "Invalid username or password");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
//       <h2>Team B Login</h2>

//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Enter team username"
//         style={{ width: "100%", padding: 10, margin: 8 }}
//       />

//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter password"
//         style={{ width: "100%", padding: 10, margin: 8 }}
//       />

//       <button
//         onClick={handleLogin}
//         style={{
//           width: "100%",
//           padding: 10,
//           marginTop: 8,
//           background: "blue",
//           color: "white",
//           border: "none",
//           borderRadius: 5,
//         }}
//       >
//         Login
//       </button>
//     </div>
//   );
// }

// import { useState } from "react";
// import { api } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function TeamBLogin() {
//   const [username, setUsername] = useState("teamB1");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await api.post("/auth/login", { username, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/teamb/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.error || "Invalid username or password");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 420, margin: "80px auto", textAlign: "center" }}>
//       <h2>Team B Login</h2>

//       <input
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Enter team username"
//         style={{ width: "100%", padding: 10, margin: 8 }}
//       />

//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter password"
//         style={{ width: "100%", padding: 10, margin: 8 }}
//       />

//       <button
//         onClick={handleLogin}
//         style={{
//           width: "100%",
//           padding: 10,
//           marginTop: 8,
//           background: "blue",
//           color: "white",
//           border: "none",
//           borderRadius: 5,
//         }}
//       >
//         Login
//       </button>
//     </div>
//   );
// }


import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "./TeamBLogin.css";

export default function TeamBLogin() {
  const [username, setUsername] = useState("teamB1");
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
      navigate("/teamb/dashboard");
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Invalid username or password");
    }
  };

  return (
    <div className="tb-page">

      <div className="tb-card">

        <h2 className="tb-title">Team B Login</h2>

        {/* ERROR MESSAGE */}
        {errorMsg && <div className="tb-error">{errorMsg}</div>}

        <input
          className="tb-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter team username"
        />

        <input
          className="tb-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button className="tb-btn" onClick={handleLogin}>
          Login
        </button>

        <button
          className="tb-back"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

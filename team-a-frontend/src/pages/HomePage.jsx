// import { useNavigate } from "react-router-dom";

// export default function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "#f0f0f0",
//       }}
//     >
//       <h1 style={{ marginBottom: 40 }}>Select Your Portal</h1>

//       <div style={{ display: "flex", gap: "20px" }}>
        
//         {/* TEAM A */}
//         <button
//           onClick={() => navigate("/login")}
//           style={{
//             padding: "20px 40px",
//             fontSize: "20px",
//             borderRadius: "10px",
//             border: "none",
//             background: "#007bff",
//             color: "white",
//             cursor: "pointer"
//           }}
//         >
//           Team A
//         </button>

//         {/* TEAM B */}
//         <button
//           onClick={() => navigate("/teamb/login")}
//           style={{
//             padding: "20px 40px",
//             fontSize: "20px",
//             borderRadius: "10px",
//             border: "none",
//             background: "#dc3545",
//             color: "white",
//             cursor: "pointer"
//           }}
//         >
//           Team B
//         </button>

//         {/* ADMIN */}
//         <button
//           onClick={() => navigate("/admin/login")}
//           style={{
//             padding: "20px 40px",
//             fontSize: "20px",
//             borderRadius: "10px",
//             border: "none",
//             background: "#28a745",
//             color: "white",
//             cursor: "pointer"
//           }}
//         >
//           Admin
//         </button>

//       </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-main">
      <div className="home-card">

        <h1 className="home-title">NSS Blood Donation Portal</h1>
        <p className="home-subtitle">Select your workspace</p>

        <div className="home-buttons">

          <button className="home-btn btn-teamA" onClick={() => navigate("/login")}>
            Team A
          </button>

          <button className="home-btn btn-teamB" onClick={() => navigate("/teamb/login")}>
            Team B
          </button>

          <button className="home-btn btn-admin" onClick={() => navigate("/admin/login")}>
            Admin
          </button>

        </div>
      </div>
    </div>
  );
}

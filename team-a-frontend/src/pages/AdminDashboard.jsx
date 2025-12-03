// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../api";
// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   const [data, setData] = useState([]);
//   const [filter, setFilter] = useState("ALL");
//   const [search, setSearch] = useState("");

//   // =============================
//   // FETCH ALL DATA
//   // =============================
//   const fetchData = async () => {
//     try {
//       const res = await api.get("/admin/all");
//       setData(res.data.entries);
//     } catch (err) {
//       alert("Error loading admin data");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   // =============================
//   // FILTER LOGIC
//   // =============================
//   const applyRoleFilter = (item) => {
//     if (filter === "ALL") return true;
//     if (filter === "STUDENT") {
//       // student = USN begins with number (1MS..., 23CS..., etc)
//       return /^[0-9]/.test(item.usn);
//     }
//     if (filter === "TEACHER") return item.usn === "TEACHER";

//     if (filter === "NONSTAFF") return item.usn === "NONSTAFF";

//     return true;
//   };

//   const filtered = data.filter(applyRoleFilter);

//   // =============================
//   // SEARCH LOGIC
//   // Searches: name, branch, phone, usn, bloodGroup
//   // =============================
//   const finalData = filtered.filter((item) => {
//     const query = search.toLowerCase();
//     return (
//       item.name.toLowerCase().includes(query) ||
//       item.branch.toLowerCase().includes(query) ||
//       item.usn.toLowerCase().includes(query) ||
//       item.phone.toLowerCase().includes(query) ||
//       item.bloodGroup.toLowerCase().includes(query)
//     );
//   });
//   const navigate = useNavigate();

// const handleLogout = () => {
//   localStorage.removeItem("token");
//   navigate("/");
// };

//   return (
//     <div className="admin-page">
// <div className="admin-top-row">
//   <h2 className="admin-title">Admin Dashboard</h2>
//   <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
// </div>

      
//       {/* FILTER BUTTONS */}
//       <div className="filter-row">
//         <button className="filter-btn" onClick={() => setFilter("ALL")}>
//           All
//         </button>
//         <button className="filter-btn" onClick={() => setFilter("STUDENT")}>
//           Students
//         </button>
//         <button className="filter-btn" onClick={() => setFilter("TEACHER")}>
//           Teachers
//         </button>
//         <button className="filter-btn" onClick={() => setFilter("NONSTAFF")}>
//           Non-Staff
//         </button>
//       </div>

//       {/* SEARCH */}
//       <input
//         className="admin-search"
//         placeholder="Search name, branch, USN, phone, blood…"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* TABLE */}
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Branch</th>
//             <th>USN / Role</th>
//             <th>Phone</th>
//             <th>Blood</th>
//             <th>Team Assigned</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {finalData.length === 0 ? (
//             <tr>
//               <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>
//                 No records found
//               </td>
//             </tr>
//           ) : (
//             finalData.map((row,index) => (
//               <tr key={row._id}>
//                 <td>{index+1}</td>
//                 <td>{row.name}</td>
//                 <td>{row.branch || "—"}</td>
//                 <td>{row.usn}</td>
//                 <td>{row.phone}</td>
//                 <td>{row.bloodGroup}</td>
//                 <td>{row.assignedTeamB ? `Team B${row.assignedTeamB}` : "—"}</td>
//                 <td>{row.status || "pending"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../api";
// import "./AdminDashboard.css";

// export default function AdminDashboard() {
//   const [data, setData] = useState([]);
//   const [filter, setFilter] = useState("ALL");
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       const res = await api.get("/admin/all");
//       setData(res.data.entries);
//     } catch {
//       alert("Error loading admin data");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const applyRoleFilter = (item) => {
//     if (filter === "ALL") return true;
//     if (filter === "STUDENT") return /^[0-9]/.test(item.usn);
//     if (filter === "TEACHER") return item.usn === "TEACHER";
//     if (filter === "NONSTAFF") return item.usn === "NONSTAFF";
//     return true;
//   };

//   const filtered = data.filter(applyRoleFilter);

//   const finalData = filtered.filter((item) => {
//     const q = search.toLowerCase();
//     return (
//       item.name.toLowerCase().includes(q) ||
//       item.branch.toLowerCase().includes(q) ||
//       item.usn.toLowerCase().includes(q) ||
//       item.phone.toLowerCase().includes(q) ||
//       item.bloodGroup.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="admin-page">

//       {/* TOP ROW */}
//       <div className="admin-top-row">
//         <h2 className="admin-title">Admin Dashboard</h2>

//         <div>
//           <button 
//             className="admin-analytics-btn"
//             onClick={() => navigate("/admin/analytics")}
//           >
//             View Analytics
//           </button>

//           <button className="admin-logout-btn" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* FILTER BUTTONS */}
//       <div className="filter-row">
//         <button className="filter-btn" onClick={() => setFilter("ALL")}>All</button>
//         <button className="filter-btn" onClick={() => setFilter("STUDENT")}>Students</button>
//         <button className="filter-btn" onClick={() => setFilter("TEACHER")}>Teachers</button>
//         <button className="filter-btn" onClick={() => setFilter("NONSTAFF")}>Non-Staff</button>
//       </div>

//       {/* SEARCH */}
//       <input
//         className="admin-search"
//         placeholder="Search name, branch, USN, phone, blood…"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* TABLE */}
//       <table className="admin-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Branch</th>
//             <th>USN / Role</th>
//             <th>Phone</th>
//             <th>Blood</th>
//             <th>Team Assigned</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {finalData.length === 0 ? (
//             <tr>
//               <td colSpan={8} style={{ textAlign: "center", padding: 20 }}>
//                 No records found
//               </td>
//             </tr>
//           ) : (
//             finalData.map((row, idx) => (
//               <tr key={row._id}>
//                 <td>{idx + 1}</td>
//                 <td>{row.name}</td>
//                 <td>{row.branch || "—"}</td>
//                 <td>{row.usn}</td>
//                 <td>{row.phone}</td>
//                 <td>{row.bloodGroup}</td>
//                 <td>{row.assignedTeamB ? `Team B${row.assignedTeamB}` : "—"}</td>
//                 <td>{row.status || "pending"}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/admin/all");
      setData(res.data.entries);
    } catch {
      alert("Error loading admin data");
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);   // ⭐ FIX: Always load from the top
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const applyRoleFilter = (item) => {
    if (filter === "ALL") return true;
    if (filter === "STUDENT") return /^[0-9]/.test(item.usn);
    if (filter === "TEACHER") return item.usn === "TEACHER";
    if (filter === "NONSTAFF") return item.usn === "NONSTAFF";
    return true;
  };

  const filtered = data.filter(applyRoleFilter);

  const finalData = filtered.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.branch.toLowerCase().includes(q) ||
      item.usn.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.bloodGroup.toLowerCase().includes(q)
    );
  });

  return (
    <div className="admin-page">

      {/* TOP ROW */}
      <div className="admin-top-row">
        <h2 className="admin-title">Admin Dashboard</h2>

        <div>
          <button 
            className="admin-analytics-btn"
            onClick={() => navigate("/admin/analytics")}
          >
            View Analytics
          </button>

          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="filter-row">
        <button className="filter-btn" onClick={() => setFilter("ALL")}>All</button>
        <button className="filter-btn" onClick={() => setFilter("STUDENT")}>Students</button>
        <button className="filter-btn" onClick={() => setFilter("TEACHER")}>Teachers</button>
        <button className="filter-btn" onClick={() => setFilter("NONSTAFF")}>Non-Staff</button>
      </div>

      {/* SEARCH */}
      <input
        className="admin-search"
        placeholder="Search name, branch, USN, phone, blood…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Branch</th>
            <th>USN / Role</th>
            <th>Phone</th>
            <th>Blood</th>
            <th>Team Assigned</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {finalData.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center", padding: 20 }}>
                No records found
              </td>
            </tr>
          ) : (
            finalData.map((row, idx) => (
              <tr key={row._id}>
                <td>{idx + 1}</td>
                <td>{row.name}</td>
                <td>{row.branch || "—"}</td>
                <td>{row.usn}</td>
                <td>{row.phone}</td>
                <td>{row.bloodGroup}</td>
                <td>{row.assignedTeamB ? `Team B${row.assignedTeamB}` : "—"}</td>
                <td>{row.status || "pending"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

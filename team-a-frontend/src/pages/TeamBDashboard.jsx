// // import { useEffect, useState } from "react";
// // import { api } from "../api";
// // import { useNavigate } from "react-router-dom";
// // import { jwtDecode } from "jwt-decode";

// // export default function TeamBDashboard() {
// //   const [students, setStudents] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   useEffect(() => {
// //     if (!token) return navigate("/teamb/login");
// //     fetchStudents();
// //   }, []);

// //   const fetchStudents = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api.get("/teamB/students", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setStudents(res.data.students);
// //     } catch (err) {
// //       if (err.response?.status === 401) {
// //         localStorage.removeItem("token");
// //         navigate("/teamb/login");
// //       } else {
// //         alert("Error loading students");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const updateStatus = async (id, status) => {
// //     try {
// //       await api.patch(
// //         `/teamB/status/${id}`,
// //         { status },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       // Optimistic UI update
// //       setStudents((prev) =>
// //         prev.map((s) => (s._id === id ? { ...s, status } : s))
// //       );
// //     } catch (err) {
// //       alert("Update failed");
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/teamb/login");
// //   };

// //   let teamNumber = null;
// //   try {
// //     teamNumber = jwtDecode(token).teamNumber;
// //   } catch {}

// //   return (
// //     <div style={{ maxWidth: 1000, margin: "20px auto", padding: 10 }}>
// //       <div style={{ display: "flex", justifyContent: "space-between" }}>
// //         <h2>Team B Dashboard — Team {teamNumber}</h2>

// //         <div>
// //           <button onClick={fetchStudents} style={{ marginRight: 8 }}>
// //             Refresh
// //           </button>
// //           <button
// //             onClick={handleLogout}
// //             style={{ background: "red", color: "white" }}
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <p>Loading...</p>
// //       ) : (
// //         <table
// //           style={{
// //             width: "100%",
// //             borderCollapse: "collapse",
// //             marginTop: 12,
// //           }}
// //         >
// //           <thead>
// //             <tr style={{ borderBottom: "1px solid #ddd" }}>
// //               <th style={{ padding: 8 }}>Name</th>
// //               <th>Branch</th>
// //               <th>USN</th>
// //               <th>Phone</th>
// //               <th>Blood Group</th>
// //               <th>Status</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {students.length === 0 && (
// //               <tr>
// //                 <td colSpan={7} style={{ padding: 20, textAlign: "center" }}>
// //                   No students assigned yet
// //                 </td>
// //               </tr>
// //             )}

// //             {students.map((s) => (
// //               <tr key={s._id} style={{ borderBottom: "1px solid #eee" }}>
// //                 <td style={{ padding: 8 }}>{s.name}</td>
// //                 <td>{s.branch}</td>
// //                 <td>{s.usn}</td>
// //                 <td>{s.phone}</td>
// //                 <td>{s.bloodGroup}</td>

// //                 <td>
// //                   <span
// //                     style={{
// //                       color:
// //                         s.status === "done"
// //                           ? "green"
// //                           : s.status === "not_done"
// //                           ? "orange"
// //                           : "black",
// //                       fontWeight: "bold",
// //                     }}
// //                   >
// //                     {s.status}
// //                   </span>
// //                 </td>

// //                 <td>
// //                   <button
// //                     onClick={() => updateStatus(s._id, "done")}
// //                     style={{ marginRight: 6 }}
// //                   >
// //                     Done
// //                   </button>

// //                   <button onClick={() => updateStatus(s._id, "not_done")}>
// //                     Not Done
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { api } from "../api";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// export default function TeamBDashboard() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // ---------- FIXED PROTECTION LOGIC ----------
//   useEffect(() => {
//     if (!token) {
//       navigate("/");   // 👈 redirect to HOME, not login
//       return;
//     }

//     fetchStudents();
//   }, []);
//   // --------------------------------------------

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);

//       const res = await api.get("/teamB/students", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setStudents(res.data.students);
//     } catch (err) {
//       if (err.response?.status === 401) {
//         localStorage.removeItem("token");
//         navigate("/");   // 👈 redirect to HOME on expired token
//       } else {
//         alert("Error loading students");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await api.patch(
//         `/teamB/status/${id}`,
//         { status },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // Optimistic UI update
//       setStudents((prev) =>
//         prev.map((s) => (s._id === id ? { ...s, status } : s))
//       );
//     } catch {
//       alert("Update failed");
//     }
//   };

//   // ---------- FIXED LOGOUT ----------
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");   // 👈 always go to HOME page now
//   };
//   // ---------------------------------

//   let teamNumber = null;
//   try {
//     teamNumber = jwtDecode(token).teamNumber;
//   } catch {}

//   return (
//     <div style={{ maxWidth: 1000, margin: "20px auto", padding: 10 }}>
//       <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <h2>Team B Dashboard — Team {teamNumber}</h2>

//         <div>
//           <button onClick={fetchStudents} style={{ marginRight: 8 }}>
//             Refresh
//           </button>
//           <button
//             onClick={handleLogout}
//             style={{ background: "red", color: "white" }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             marginTop: 12,
//           }}
//         >
//           <thead>
//             <tr style={{ borderBottom: "1px solid #ddd" }}>
//               <th style={{ padding: 8 }}>Name</th>
//               <th>Branch</th>
//               <th>USN</th>
//               <th>Phone</th>
//               <th>Blood Group</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students.length === 0 && (
//               <tr>
//                 <td colSpan={7} style={{ padding: 20, textAlign: "center" }}>
//                   No students assigned yet
//                 </td>
//               </tr>
//             )}

//             {students.map((s) => (
//               <tr key={s._id} style={{ borderBottom: "1px solid #eee" }}>
//                 <td style={{ padding: 8 }}>{s.name}</td>
//                 <td>{s.branch}</td>
//                 <td>{s.usn}</td>
//                 <td>{s.phone}</td>
//                 <td>{s.bloodGroup}</td>

//                 <td>
//                   <span
//                     style={{
//                       color:
//                         s.status === "done"
//                           ? "green"
//                           : s.status === "not_done"
//                           ? "orange"
//                           : "black",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {s.status}
//                   </span>
//                 </td>

//                 <td>
//                   <button
//                     onClick={() => updateStatus(s._id, "done")}
//                     style={{ marginRight: 6 }}
//                   >
//                     Done
//                   </button>
//                   <button onClick={() => updateStatus(s._id, "not_done")}>
//                     Not Done
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./TeamBDashboard.css";

export default function TeamBDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/teamB/students");
      setStudents(res.data.students);
    } catch {
      localStorage.removeItem("token");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/teamB/status/${id}`, { status });
      setStudents(prev =>
        prev.map(s => (s._id === id ? { ...s, status } : s))
      );
    } catch {
      alert("Failed to update");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  let teamNumber = null;
  try {
    teamNumber = jwtDecode(token).teamNumber;
  } catch {}

  return (
    <div className="tb-dashboard">

      <div className="tb-header">
        <h2 className="tb-title">Team B Dashboard — Team {teamNumber}</h2>

        <div>
          <button className="tb-btn tb-refresh" onClick={fetchStudents}>
            Refresh
          </button>
          <button className="tb-btn tb-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p className="loading-txt">Loading...</p>
      ) : (
        <table className="tb-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>USN</th>
              <th>Phone</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={7} className="no-data">No students assigned yet</td>
              </tr>
            ) : (
              students.map(s => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.branch}</td>
                  <td>{s.usn}</td>
                  <td>{s.phone}</td>
                  <td>{s.bloodGroup}</td>

                  <td>
                    <span
                      className={
                        s.status === "done"
                          ? "status-badge status-done"
                          : s.status === "not_done"
                          ? "status-badge status-not-done"
                          : "status-badge status-pending"
                      }
                    >
                      {s.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="action-btn btn-done"
                      onClick={() => updateStatus(s._id, "done")}
                    >
                      Done
                    </button>

                    <button
                      className="action-btn btn-not-done"
                      onClick={() => updateStatus(s._id, "not_done")}
                    >
                      Not Done
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

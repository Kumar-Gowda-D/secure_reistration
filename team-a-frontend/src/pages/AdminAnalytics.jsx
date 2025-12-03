// import { useEffect, useState } from "react";
// import { api } from "../api";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   CartesianGrid, ResponsiveContainer
// } from "recharts";
// import "./AdminAnalytics.css";

// export default function AdminAnalytics() {
//   const [chartData, setChartData] = useState([]);
//   const navigate = useNavigate();

//   const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

//   const fetchData = async () => {
//     try {
//       const res = await api.get("/admin/all");
//       const entries = res.data.entries;

//       const countMap = {};
//       bloodGroups.forEach(bg => (countMap[bg] = 0));

//       entries.forEach(item => {
//         if (countMap[item.bloodGroup] !== undefined) {
//           countMap[item.bloodGroup]++;
//         }
//       });

//       const formatted = bloodGroups.map(bg => ({
//         group: bg,
//         count: countMap[bg]
//       }));

//       setChartData(formatted);

//     } catch {
//       alert("Failed to load analytics");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="analytics-page">

//       <div className="analytics-header">
//         <h2 className="analytics-title">Blood Group Analytics</h2>

//         <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
//           ← Back
//         </button>
//       </div>

//       <div className="analytics-card">
//         <ResponsiveContainer width="100%" height={350}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#ffd6d6" />
//             <XAxis dataKey="group" stroke="#7a0000" />
//             <YAxis stroke="#7a0000" />
//             <Tooltip />
//             <Bar dataKey="count" fill="#b30000" barSize={40} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import "./AdminAnalytics.css";

export default function AdminAnalytics() {
  const [chartData, setChartData] = useState([]);
  const [totalDonors, setTotalDonors] = useState(0);
  const navigate = useNavigate();

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  // =============================
  // FETCH DATA FUNCTION
  // =============================
  const fetchData = async () => {
    try {
      const res = await api.get("/admin/all");
      const entries = res.data.entries;

      setTotalDonors(entries.length);

      const countMap = {};
      bloodGroups.forEach(bg => (countMap[bg] = 0));

      entries.forEach(item => {
        if (countMap[item.bloodGroup] !== undefined) {
          countMap[item.bloodGroup]++;
        }
      });

      const formatted = bloodGroups.map(bg => ({
        group: bg,
        count: countMap[bg]
      }));

      setChartData(formatted);
    } catch (err) {
      console.log(err);
      alert("Failed to load analytics");
    }
  };

  // =============================
  // USE EFFECT WITH AUTO REFRESH (5 min)
  // =============================
  useEffect(() => {
    fetchData(); // initial load

    const interval = setInterval(() => {
      fetchData();
      console.log("🔄 Auto-refreshed analytics data");
    }, 200000); // 5 minutes = 300000 ms

    return () => clearInterval(interval); // cleanup on page exit
  }, []);

  return (
    <div className="analytics-page">

      <div className="analytics-header">
        <h2 className="analytics-title">Blood Group Analytics</h2>

        <button className="back-btn" onClick={() => navigate("/admin/dashboard")}>
          ← Back
        </button>
      </div>

      {/* ⭐ Total donors count */}
      <h3 className="donor-count">
        Total Donors: <span>{totalDonors}</span>
      </h3>

      <div className="analytics-card">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffd6d6" />
            <XAxis dataKey="group" stroke="#7a0000" />
            <YAxis stroke="#7a0000" />
            <Tooltip />
            <Bar dataKey="count" fill="#b30000" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

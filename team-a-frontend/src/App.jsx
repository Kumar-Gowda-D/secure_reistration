// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import TeamBLogin from "./pages/TeamBLogin";
// import TeamBDashboard from "./pages/TeamBDashboard";


// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/teamb/login" element={<TeamBLogin />} />
//         <Route path="/teamb/dashboard" element={<TeamBDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import "./app.css";   // ✅ Add this only ONCE (global styles)

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TeamBLogin from "./pages/TeamBLogin";
import TeamBDashboard from "./pages/TeamBDashboard";
import AdminLogin from "./pages/AdminLogin";         
 import AdminDashboard from "./pages/AdminDashboard"; 
 import AdminAnalytics from "./pages/AdminAnalytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME PAGE */}
        <Route path="/" element={<HomePage />} />

        {/* TEAM A ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* TEAM B ROUTES */}
        <Route path="/teamb/login" element={<TeamBLogin />} />
        <Route path="/teamb/dashboard" element={<TeamBDashboard />} />

        {/* ADMIN (placeholder for now) */}
        <Route path="/admin/login" element={<div><AdminLogin /></div>} />
         <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
      </Routes>
    </BrowserRouter>
  );
}

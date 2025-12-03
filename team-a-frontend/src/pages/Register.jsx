// import { useState } from "react";
// import { api } from "../api";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     branch: "",
//     usn: "",
//     phone: "",
//     bloodGroup: "",
//   });

//   const [showForm, setShowForm] = useState(true);
//   const [notification, setNotification] = useState(null);
//   const [assignedTeam, setAssignedTeam] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const clearForm = () => {
//     setForm({
//       name: "",
//       branch: "",
//       usn: "",
//       phone: "",
//       bloodGroup: "",
//     });
//   };

//   const handleRegister = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       const res = await api.post("/register", form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setAssignedTeam(res.data.assignedTeamB);
//       setNotification({
//         type: "success",
//         message: `Assigned to Team B${res.data.assignedTeamB}`,
//       });

//       clearForm();
//       setShowForm(false);
//     } catch (err) {
//       const message = err.response?.data?.error || "Something went wrong";

//       setNotification({
//         type: "error",
//         message: message,
//       });

//       setShowForm(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseNotification = () => {
//     setNotification(null);
//     setShowForm(true);
//     setAssignedTeam(null);
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "50px auto", textAlign: "center" }}>
      
//       {/* LOGOUT BUTTON */}
//       <button
//         onClick={handleLogout}
//         style={{
//           position: "absolute",
//           top: 20,
//           right: 20,
//           padding: "8px 12px",
//           background: "red",
//           color: "white",
//           border: "none",
//           borderRadius: 5,
//           cursor: "pointer",
//           fontSize: 14,
//         }}
//       >
//         Logout
//       </button>

//       <h2>Student Registration (Team A)</h2>

//       {/* POPUP NOTIFICATION */}
//       {notification && (
//         <div
//           style={{
//             padding: 30,
//             borderRadius: 10,
//             marginBottom: 20,
//             fontSize: 20,
//             fontWeight: "bold",
//             background:
//               notification.type === "success" ? "#d4edda" : "#f8d7da",
//             color:
//               notification.type === "success" ? "#155724" : "#721c24",
//           }}
//         >
//           {/* ICON */}
//           <div style={{ fontSize: 40 }}>
//             {notification.type === "success" ? "✔" : "✖"}
//           </div>

//           {/* MESSAGE */}
//           <div style={{ marginTop: 10 }}>{notification.message}</div>

//           {/* OK / TRY AGAIN BUTTON */}
//           <button
//             onClick={handleCloseNotification}
//             style={{
//               marginTop: 20,
//               padding: 10,
//               width: "60%",
//               background:
//                 notification.type === "success" ? "green" : "red",
//               color: "white",
//               fontSize: 18,
//               borderRadius: 8,
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             {notification.type === "success" ? "OK" : "Try Again"}
//           </button>
//         </div>
//       )}

//       {/* REGISTRATION FORM */}
//       {showForm && (
//         <div>
//           {["name", "branch", "usn", "phone", "bloodGroup"].map((field) => (
//             <input
//               key={field}
//               name={field}
//               placeholder={field}
//               value={form[field]}
//               onChange={handleChange}
//               style={{
//                 width: "100%",
//                 padding: 10,
//                 marginTop: 10,
//                 borderRadius: 5,
//                 border: "1px solid #ccc",
//               }}
//             />
//           ))}

//           <button
//             onClick={handleRegister}
//             disabled={loading}
//             style={{
//               marginTop: 20,
//               padding: 10,
//               width: "100%",
//               background: loading ? "#aaa" : "blue",
//               color: "white",
//               border: "none",
//               borderRadius: 5,
//               cursor: "pointer",
//             }}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    branch: "",
    usn: "",
    phone: "",
    bloodGroup: "",
  });

  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ----------------- LOGOUT -----------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ----------------- VALIDATION -----------------
  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(form.name))
      temp.name = "Only letters allowed";

    if (!form.branch.trim()) temp.branch = "Branch is required";

    if (!form.usn.trim()) temp.usn = "USN is required";
    else if (!/^[A-Z0-9]+$/.test(form.usn))
      temp.usn = "USN must be uppercase letters & numbers";

    if (!form.phone.trim()) temp.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone))
      temp.phone = "Enter a valid 10-digit number";

    if (!form.bloodGroup.trim()) temp.bloodGroup = "Select blood group";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  // ----------------- HANDLE CHANGE -----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    // Only branch + usn in uppercase
    if (name === "branch" || name === "usn") {
      updatedValue = updatedValue.toUpperCase();
    }

    setErrors({ ...errors, [name]: "" }); // Clear error in real-time

    setForm({ ...form, [name]: updatedValue });
  };

  // ----------------- CLEAR FORM -----------------
  const clearForm = () => {
    setForm({
      name: "",
      branch: "",
      usn: "",
      phone: "",
      bloodGroup: "",
    });
  };

  // ----------------- SUBMIT FORM -----------------
  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/register", form);

      setNotification({
        type: "success",
        message: `Assigned to Team B${res.data.assignedTeamB}`,
      });

      clearForm();
      setShowForm(false);

    } catch (err) {
      const message = err.response?.data?.error || "Something went wrong";

      setNotification({
        type: "error",
        message,
      });

      setShowForm(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
    setShowForm(true);
  };

  return (
    <div className="reg-page">

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="reg-card">

        <h2 className="reg-title">Student Registration (Team A)</h2>

        {/* POPUP */}
        {notification && (
          <div className={`popup ${notification.type}`}>
            <div className="popup-icon">
              {notification.type === "success" ? "✔" : "✖"}
            </div>
            <div className="popup-msg">{notification.message}</div>

            <button className="btn popup-btn" onClick={handleCloseNotification}>
              {notification.type === "success" ? "OK" : "Try Again"}
            </button>
          </div>
        )}

        {/* MAIN FORM */}
        {showForm && (
          <>
            <input
              className="input-box"
              name="name"
              placeholder="Enter student name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <p className="err">{errors.name}</p>}

            <input
              className="input-box"
              name="branch"
              placeholder="Branch (ex: CSE, ECE)"
              value={form.branch}
              onChange={handleChange}
            />
            {errors.branch && <p className="err">{errors.branch}</p>}

            <input
              className="input-box"
              name="usn"
              placeholder="USN (ex: 1MS21CS001)"
              value={form.usn}
              onChange={handleChange}
            />
            {errors.usn && <p className="err">{errors.usn}</p>}

            <input
              className="input-box"
              name="phone"
              placeholder="Phone (10-digit)"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="err">{errors.phone}</p>}

            <select
              className="input-box"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            {errors.bloodGroup && <p className="err">{errors.bloodGroup}</p>}

            <button
              className="btn submit-btn"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

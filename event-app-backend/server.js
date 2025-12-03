// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./src/config/db.js');
// const teamBRoutes = require("./src/routes/teamBRoutes");

// const authRoutes = require('./src/routes/authRoutes');
// const registerRoutes = require('./src/routes/registerRoutes');

// const app = express();
// // app.use(cors());
// app.use(cors({
//   origin: "*",          // allow any origin (easy for testing)
//   methods: "GET,POST,PUT,DELETE,PATCH",
//   credentials: true
// }));
// app.use(express.json());

// connectDB();
// app.use('/api/auth', authRoutes);
// app.use('/api/register', registerRoutes);
// app.use("/api/teamB", teamBRoutes);
// // app.listen(process.env.PORT, () => {
// //   console.log("Server running on port", process.env.PORT);
// // });

// app.listen(process.env.PORT, "0.0.0.0", () => {
//   console.log("Server running on port", process.env.PORT);
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.js');

const authRoutes = require('./src/routes/authRoutes');
const registerRoutes = require('./src/routes/registerRoutes');
const teamBRoutes = require('./src/routes/teamBRoutes');
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

/* -------------------- CORS -------------------- */
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true
}));

app.use(express.json());

/* -------------------- CONNECT DB -------------------- */
connectDB();

/* -------------------- ROUTES -------------------- */
app.use('/api/auth', authRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/teamB', teamBRoutes);
app.use("/api/admin", adminRoutes);

/* -------------------- 404 HANDLER -------------------- */
app.use((req, res, next) => {
  return res.status(404).json({ error: "API route not found" });
});

/* -------------------- GLOBAL ERROR HANDLER -------------------- */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);

  return res.status(500).json({
    error: "Something went wrong on the server",
    message: err.message
  });
});

/* -------------------- PROCESS-LEVEL CRASH PROTECTION -------------------- */

// Prevent app crash due to unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection:", reason);
});

// Prevent app crash due to uncaught error
process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception:", err);
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("🚀 Server running on port", PORT);
});

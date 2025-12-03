const express = require("express");
const router = express.Router();

const { adminLogin } = require("../controllers/adminController");
const authAdmin = require("../middlewares/authAdmin");
const Student = require("../models/Student");

router.post("/login", adminLogin);

router.get("/all", authAdmin, async (req, res) => {
  try {
    const entries = await Student.find().sort({ name: 1 });
    res.json({ entries });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

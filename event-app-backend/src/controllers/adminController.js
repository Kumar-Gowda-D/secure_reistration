const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await User.findOne({ username, role: "admin" });

    if (!admin) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    // IMPORTANT: MUST INCLUDE ROLE
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

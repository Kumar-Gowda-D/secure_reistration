// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) return res.status(401).json({ error: "Invalid credentials" });

//     const ok = await bcrypt.compare(password, user.passwordHash);
//     if (!ok) return res.status(401).json({ error: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user._id, role: user.role, teamNumber: user.teamNumber },
//       process.env.JWT_SECRET,
//       { expiresIn: "8h" }
//     );

//     res.json({ token });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare password
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create token with teamNumber
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
        teamNumber: user.teamNumber || null   // Only teamB gets this
      },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.json({ 
      success: true,
      token 
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

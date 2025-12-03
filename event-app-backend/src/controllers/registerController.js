// const Student = require('../models/Student');
// const Counter = require('../models/Counter');

// exports.registerStudent = async (req, res) => {
//   try {
//     const { name, branch, usn, phone, bloodGroup, teamLeader } = req.body;

//     if (!name || !branch || !usn || !phone || !bloodGroup)
//       return res.status(400).json({ error: "Missing required fields" });

//     // ATOMIC INCREMENT
//     const counter = await Counter.findOneAndUpdate(
//       { _id: "teamB_counter" },
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     );

//     const assignedTeamB = ((counter.seq - 1) % 12) + 1;

//     const student = await Student.create({
//       name, branch, usn, phone,
//       bloodGroup, teamLeader: teamLeader || null,
//       assignedTeamB,
//       registeredBy: "teamA"
//     });

//     res.json({
//       success: true,
//       assignedTeamB,
//       studentId: student._id
//     });

//   } catch (err) {
//     console.error(err);

//     if (err.code === 11000) {
//       return res.status(400).json({ error: "USN already exists" });
//     }

//     res.status(500).json({ error: "Server Error" });
//   }
// };

const Student = require('../models/Student');
const Counter = require('../models/Counter');

exports.registerStudent = async (req, res) => {
  try {
    const { name, branch, usn, phone, bloodGroup } = req.body;  

    // 1) VALIDATE INPUT FIRST (no counter increment here)
    if (!name || !branch || !usn || !phone || !bloodGroup) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Phone validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    // Check duplicate USN BEFORE incrementing counter
    const existingUSN = await Student.findOne({ usn });
    if (existingUSN) {
      return res.status(400).json({ error: "USN already exists" });
    }

    // 2) ONLY NOW DO ROUND ROBIN COUNTER (only on valid data)
    const counter = await Counter.findOneAndUpdate(
      { _id: "teamB_counter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const assignedTeamB = ((counter.seq - 1) % 13) + 1;

    // 3) INSERT STUDENT
    const student = await Student.create({
      name,
      branch,
      usn,
      phone,
      bloodGroup,
      assignedTeamB,
      status: "pending",
      registeredBy: "teamA"
    });

    // 4) SUCCESS RESPONSE
    return res.json({
      success: true,
      assignedTeamB,
      studentId: student._id
    });

  } catch (err) {
    console.error(err);

    // Mongo duplicate index error
    if (err.code === 11000) {
      return res.status(400).json({ error: "USN already exists" });
    }

    return res.status(500).json({ error: "Server Error" });
  }
};

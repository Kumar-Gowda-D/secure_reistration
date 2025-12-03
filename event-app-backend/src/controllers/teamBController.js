const Student = require('../models/Student');

exports.getAssignedStudents = async (req, res) => {
  try {
    const teamNumber = req.user.teamNumber;
    if (!teamNumber) return res.status(400).json({ error: "Invalid team" });

    const students = await Student.find({ assignedTeamB: teamNumber }).sort({ createdAt: -1 });

    res.json({ success: true, students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateStudentStatus = async (req, res) => {
  try {
    const teamNumber = req.user.teamNumber;
    const studentId = req.params.id;
    const { status } = req.body;

    if (!["done", "not_done"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ error: "Student not found" });

    if (student.assignedTeamB !== teamNumber) {
      return res.status(403).json({ error: "Not allowed" });
    }

    student.status = status;
    await student.save();

    res.json({ success: true, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

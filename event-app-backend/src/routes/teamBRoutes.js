const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware.js");

const {
  getAssignedStudents,
  updateStudentStatus,
} = require("../controllers/teamBController");

router.get("/students", auth("teamB"), getAssignedStudents);
router.patch("/status/:id", auth("teamB"), updateStudentStatus);

module.exports = router;

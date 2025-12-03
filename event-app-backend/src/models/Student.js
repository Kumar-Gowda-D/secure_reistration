const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },

  branch: { type: String, required: true },

  usn: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true,
    match: /^[0-9A-Z]+$/ 
  },

  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/        // Indian 10-digit validation
  },

  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  },

  assignedTeamB: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },

  status: {
    type: String,
    enum: ["pending", "done", "not_done"],
    default: "pending"
  },

  registeredBy: {
    type: String,
    default: "teamA"
  }

}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);

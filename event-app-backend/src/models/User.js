const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },

  passwordHash: { type: String, required: true },

  role: { type: String, enum: ["teamA", "teamB", "admin"], required: true },

  teamNumber: { type: Number, default: null }    // for teamB only
});

module.exports = mongoose.model("User", UserSchema);

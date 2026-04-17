const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: String,
  expiresAt: Date,
}, { timestamps: true });

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
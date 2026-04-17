const authService = require("../services/auth.service");
const sendEmail = require("../utils/email");
const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);

    const { password, ...safeUser } = data.user._doc;

    // 🍪 Set refresh token as cookie
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      user: safeUser,
      accessToken: data.accessToken,
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const { generateAccessToken } = require("../utils/jwt");

const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new Error("No refresh token");

    const stored = await RefreshToken.findOne({ token });
    if (!stored) throw new Error("Invalid refresh token");

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const accessToken = generateAccessToken({ _id: decoded.id, role: "patient" });

    res.json({ accessToken });

  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    await RefreshToken.deleteOne({ token });

    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const User = require("../models/User");
const { generateResetToken } = require("../utils/token");


  const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    // 🔐 Security: don't reveal if user exists
    if (!user) {
      return res.json({ message: "If email exists, reset link sent" });
    }

    const { resetToken, hashedToken } = generateResetToken();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // 🔗 Reset URL
    const resetURL = `http://localhost:5011/reset-password/${resetToken}`;

    const html = `
      <h2>Password Reset</h2>
      <p>Click the link below:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link expires in 10 minutes</p>
    `;

    console.log("Sending email to:", user.email); // debug

    await sendEmail(user.email, "Password Reset", html);

    res.json({ message: "Reset link sent to email" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

const crypto = require("crypto");
const { hashPassword } = require("../utils/hash");

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) throw new Error("Invalid or expired token");

    user.password = await hashPassword(newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { register, login, refreshAccessToken, logout, forgotPassword, resetPassword };
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const registerUser = async (data) => {
  const { name, email, password, role } = data;

  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
    isApproved: role === "doctor" ? false : true,
  });

  return user;
};
const RefreshToken = require("../models/RefreshToken");

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { user, accessToken, refreshToken };
};
module.exports = { registerUser, loginUser };
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
const adminOnly = (
  req,
  res,
  next
) => {

  if (
    req.user.role !==
    "admin"
  ) {
    return res
      .status(403)
      .json({
        message:
          "Admin access only",
      });
  }

  next();
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

module.exports = { protect, authorize, adminOnly };
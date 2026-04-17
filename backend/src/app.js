const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error.middleware");
const limiter = require("./middleware/rateLimit");
const authRoutes = require("./routes/auth.routes");
const doctorRoutes = require("./routes/doctor.routes");
const adminRoutes = require("./routes/admin.routes");
const publicRoutes = require("./routes/public.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);
app.use(limiter);
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);
module.exports = app;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const matchRoutes = require("./routes/matchRoutes");
const adminRoutes = require("./routes/adminRoutes");
const solarUserRoutes = require("./routes/solarUserRoutes"); // Import Solar User routes

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/match", matchRoutes);
app.use("/admin", adminRoutes);
app.use("/solar-users", solarUserRoutes); // Register Solar User routes

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Solar Afriq API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

// Database Connection and Server Startup
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1); // Exit the application on database connection failure
  });

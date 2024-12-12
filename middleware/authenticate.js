const jwt = require("jsonwebtoken");
const Installer = require("../models/installerModel");
const SolarUser = require("../models/solarUserModel");
const SECRET_KEY = process.env.SECRET_KEY || "Vybz_kartel_2003";

// Middleware to verify the token
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    // Determine user role and fetch corresponding user
    let user = null;

    if (decoded.role === "installer") {
      user = await Installer.findById(decoded.id).select("-password");
    } else if (decoded.role === "solarUser") {
      user = await SolarUser.findById(decoded.id).select("-password");
    } else if (decoded.role === "admin") {
      // For admin, directly verify if the user has admin privileges
      user = await Installer.findById(decoded.id).select("-password");
      if (user && user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized: Admins only" });
      }
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user; // Set a common req.user object for all roles
    req.user.role = decoded.role; // Attach the role for further use

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;

const express = require("express");
const {
  registerInstaller,
  loginInstaller,
  getInstallerProfile,
} = require("../controllers/authController");
const validateInstallerRegistration = require("../middleware/validateInstallerRegistration");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Installer Registration
router.post("/register", validateInstallerRegistration, registerInstaller);

// Installer Login
router.post("/login", loginInstaller);

// Get Installer Profile
router.get("/profile", authenticate, getInstallerProfile);

module.exports = router;

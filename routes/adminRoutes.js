// adminRoutes.js

const express = require("express");
const authenticate = require("../middleware/authenticate");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const Installer = require("../models/installerModel");

const router = express.Router();

// Endpoint to promote an installer to admin
router.patch(
  "/assign-role/:id",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (role !== "admin") {
      return res
        .status(400)
        .json({ message: "Only 'admin' role can be assigned." });
    }

    try {
      const installer = await Installer.findByIdAndUpdate(
        id,
        { role: "admin" },
        { new: true }
      );

      if (!installer) {
        return res.status(404).json({ message: "Installer not found" });
      }

      res
        .status(200)
        .json({ message: "Installer promoted to admin", installer });
    } catch (error) {
      console.error("Error promoting installer:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;

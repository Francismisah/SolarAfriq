const express = require("express");
const router = express.Router();
const SolarUser = require("../models/solarUserModel");
const Match = require("../models/matchModel");
const matchController = require("../controllers/matchController");
const authenticate = require("../middleware/authenticate");

// **Create Solar User and Find Matches Automatically**
router.post("/create", async (req, res) => {
  const { name, email, location, address, phoneNumber } = req.body;

  // Validate input
  if (!name || !email || !location || !address || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new Solar User
    const newSolarUser = new SolarUser({
      name,
      email,
      location,
      address,
      phoneNumber,
    });

    await newSolarUser.save();

    // Fetch Installers that match this Solar User's location
    const matchedInstallers = await matchController.findMatches(
      newSolarUser._id
    );

    // Save match data to the database
    const matchData = new Match({
      solarUserId: newSolarUser._id,
      matchedInstallers: matchedInstallers.map((installer) => installer._id),
    });
    await matchData.save();

    // Respond with the simplified solar user details and matched installers
    res.status(201).json({
      message: "Solar User created and matches saved successfully",
      solarUser: {
        name: newSolarUser.name,
        location: newSolarUser.location,
        address: newSolarUser.address,
      },
      installers: matchedInstallers,
    });
  } catch (error) {
    console.error("Error creating Solar User:", error);
    res.status(500).json({ message: "Error creating Solar User" });
  }
});

// **Get a Single Solar User**
router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    // Find Solar User by ID
    const solarUser = await SolarUser.findById(id);

    if (!solarUser) {
      return res.status(404).json({ message: "Solar User not found" });
    }

    res.status(200).json({ solarUser });
  } catch (error) {
    console.error("Error fetching Solar User:", error);
    res.status(500).json({ message: "Error fetching Solar User" });
  }
});

// **Get All Solar Users**
router.get("/", authenticate, async (req, res) => {
  try {
    const solarUsers = await SolarUser.find();

    if (!solarUsers || solarUsers.length === 0) {
      return res.status(404).json({ message: "No Solar Users found" });
    }

    res.status(200).json({ solarUsers });
  } catch (error) {
    console.error("Error fetching Solar Users:", error);
    res.status(500).json({ message: "Error fetching Solar Users" });
  }
});

module.exports = router;

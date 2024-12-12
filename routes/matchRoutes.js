const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const matchController = require("../controllers/matchController");

// **Get Matches by Solar User ID**
router.get("/get-match/:id", authenticate, async (req, res) => {
  const { id } = req.params; // Solar User ID

  try {
    // Call the matchController to find matches for the Solar User
    const matches = await matchController.findMatches(id);

    if (!matches || matches.message) {
      return res.status(404).json({ message: matches.message });
    }

    // Respond with matched installers
    res.status(200).json({ message: "Matches found", matches });
  } catch (error) {
    console.error("Match Fetch Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// **Additional Routes for Matching (optional)**

// Example: Create a new Solar User (this might belong in a different route file)
router.post("/create-solar-user", authenticate, async (req, res) => {
  try {
    const { name, email, location, address } = req.body;

    // Validate input
    if (!name || !email || !location || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new Solar User
    const newSolarUser = await SolarUser.create({
      name,
      email,
      location,
      address,
    });

    res.status(201).json({
      message: "Solar User created successfully",
      solarUser: newSolarUser,
    });
  } catch (error) {
    console.error("Solar User Creation Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

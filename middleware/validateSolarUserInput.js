// Middleware to validate solar user input
const validateSolarUserInput = (req, res, next) => {
  const { name, email, phoneNumber, location, address } = req.body;

  if (!name || !email || !phoneNumber || !location || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Optional: Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Proceed if validation passes
  next();
};

module.exports = validateSolarUserInput;

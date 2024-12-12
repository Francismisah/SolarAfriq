// Middleware to check if the user is an admin
const authorizeAdmin = (req, res, next) => {
  try {
    // Ensure req.user exists and has a role
    if (!req.user || !req.user.role) {
      console.warn("Authorization Error: User or role not found in request");
      return res.status(403).json({ message: "Access denied: Role not found" });
    }

    // Check if the role is admin
    if (req.user.role !== "admin") {
      console.warn(
        `Unauthorized access attempt by user with ID: ${req.user.id}, Role: ${req.user.role}`
      );
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Log successful authorization for auditing purposes
    console.info(`Admin access granted to user with ID: ${req.user.id}`);

    next(); // Allow access if the role is admin
  } catch (error) {
    console.error("Authorization Middleware Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authorizeAdmin;

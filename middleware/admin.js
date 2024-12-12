module.exports = (req, res, next) => {
  // Check if the authenticated user has the admin role
  if (req.user && req.user.role === "admin") {
    next(); // Proceed to the next middleware or route handler
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

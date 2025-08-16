const jwt = require("jsonwebtoken");

function adminOnly(req, res, next) {
  try {
    // token get kro headers se
    const token = req.headers["authorization"]?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // decode/verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // role check kro
    if (decoded.role === "admin") {
      req.user = decoded; // user data req me add krdiya
      next(); // proceed
    } else {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = adminOnly;

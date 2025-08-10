const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ emailAddress: decoded.email });
    if (!user) return res.status(401).json({ message: "User no longer exists" });

    req.user = user; // Set req.user for next middleware/route
    next();

  } catch (err) {
    res.status(401).json({ message: "Unauthorized: " + err.message });
  }
};

module.exports = auth;

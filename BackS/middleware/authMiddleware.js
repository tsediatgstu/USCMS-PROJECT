const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protectAdmin = async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify token using the secret from your .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user and check if they are the Admin
      const user = await User.findById(decoded.id);

      if (user && user.role === 'admin') {
        next(); // Authorization success: Proceed to the Admin function
      } else {
        res.status(403).json({ message: "Access Denied: Admin Authority Required" });
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

module.exports = { protectAdmin };
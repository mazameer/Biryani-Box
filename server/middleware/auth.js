const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        return res.status(401).json("No token");
      }

      // ✅ Remove "Bearer "
      if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const decoded = jwt.verify(token, "secretkey");

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json("Access denied");
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json("Invalid token");
    }
  };
};
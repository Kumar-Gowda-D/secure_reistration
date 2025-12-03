const jwt = require('jsonwebtoken');

module.exports = (requiredRole) => {
  return async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "No token" });

    const token = header.split(" ")[1];

    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);

      if (requiredRole && data.role !== requiredRole)
        return res.status(403).json({ error: "Access denied" });

      req.user = data;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
};

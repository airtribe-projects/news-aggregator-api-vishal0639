const jwt = require("jsonwebtoken");


const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded =decodeToken(token);

    req.user = decoded;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token invalid or expired" });
  }
};

module.exports = isAuthenticated;

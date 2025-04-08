const jwt = require("jsonwebtoken");
require("dotenv").config;

const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token no proporcionado o mal formado" });
  }

  const token = authHeader.split(" ")[1];

  console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);
  console.log("🪙 Token recibido:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error al verificar token:", error.message);
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = verifyToken;

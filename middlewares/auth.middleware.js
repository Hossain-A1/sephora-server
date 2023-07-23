const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authorizationUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw Error("Invalid token formatted.");
    }

    const token = await authHeader.split(" ")[1];

    if (!token) {
      throw Error("No token provided.");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(id);

    next();
  } catch (error) {
    if (error.name === "jsonWebTokenError") {
      res.status(400).json({ error: "Unauthorized user." });
    } else {
      res.status(403).json({ error: "Unauthorized access." });
    }
  }
};

module.exports = { authorizationUser };

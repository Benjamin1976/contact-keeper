const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorisation denied" });
  }

  try {
    const secret =
      process.env.ENV_NODE === "production"
        ? process.env.jwtSecret
        : config.get("jwtSecret");

    // Read payload into json is verified (payload is just user)
    const decoded = jwt.verify(token, secret);

    // Add the decoded user to the req header
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

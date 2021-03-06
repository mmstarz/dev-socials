const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // get token from the header
  const token = req.header("x-auth-token");
  // if no token found
  if (!token)
    return res
      .status(401)
      .json({ msg: "Token not found. Authorization denied" });

  try {
    // verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // assign req user with decoded user id
    req.user = decoded.user
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token not valid. Authorization denied" });
  }
};

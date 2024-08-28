const jwt = require("jsonwebtoken");

const authChecked = (req, res, next) => {
  const encodedToken = req.body.token;
  try {
    const userInfo = jwt.verify(encodedToken, process.env.ACCESS_SECRET_TOKEN);
    res.status(200).json({ success: true, message: "This token is valid" });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authChecked;

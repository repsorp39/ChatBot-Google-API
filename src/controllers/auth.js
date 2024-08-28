const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const encodedToken = req.headers.authorization.split(" ")[1];
    const userInfo = jwt.verify(encodedToken, process.env.ACCESS_SECRET_TOKEN);
    const userId = userInfo.userId;
    delete req.body.id;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "This token is invalid" });
  }
};

module.exports = auth;

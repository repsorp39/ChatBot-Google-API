const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.handleInsc = (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
     res.status(400).json({err:"Missing values for email or passsword"});
    }
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        User.create({
          email: req.body.email,
          password: hash,
        })
          .then((user) => {
            res.status(201).json({
              message: "Nouvel utilisateur créé",
              userId: user._id,
            });
          })
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.handleLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      throw new Error("Missing values for email or passsword");

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({
        message: "Mot de passe incorrecte ou utilisateur inexistant ",
      });
      return;
    }

    bcrypt
      .compare(req.body.password, user.password)
      .then((pass_match) => {
        if (!pass_match) {
          res.status(400).json({
            message: "Mot de passe incorrecte ou utilisateur inexistant ",
          });
          return;
        }

        res.status(200).json({
          userId: user._id,
          token: jwt.sign({ userId: user._id }, process.env.ACCESS_SECRET_TOKEN, {
            expiresIn: "24h",
          }),
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
};

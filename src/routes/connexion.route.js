const express = require("express");
const {
  handleLogin,
  handleInsc,
} = require("../controllers/connexion.controller");
const router = express.Router();

router.post("/login", handleLogin);
router.post("/insc", handleInsc);

module.exports = router;

const express = require("express");
const authChecked = require("../controllers/authChecked");
const router = express.Router();

router.post("/", authChecked);
module.exports = router;

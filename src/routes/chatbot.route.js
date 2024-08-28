const express = require("express");
const upload = require("../controllers/file-upload");
const {
  getHistorique,
  newPrompt,
} = require("../controllers/chatbot.controller");
const auth = require("../controllers/auth");
const router = express.Router();

router.get("/historique", auth, getHistorique);
router.post("/new-prompt", auth, upload, newPrompt);
module.exports = router;

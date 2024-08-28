const ChatBot = require("../models/Conversation");
const dotenv = require("dotenv").config();
const path = require("path");
const {
  getResponse,
  oldChatWithBot,
  ableChatFromImage,
} = require("../controllers/chatbot.function");

module.exports.getHistorique = async (req, res) => {
  try {
    const historiques = await ChatBot.find({ userId: req.auth.userId });
    res.status(200).json({ historique: historiques });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.newPrompt = async (req, res) => {
  const historiques = await oldChatWithBot(req.auth.userId);
  const prompt = req.body.prompt;

  try {
    if (!prompt) throw new Error("Missing value for prompt");

    //Dans le cas ou il s'agit d'un simple prompt sans image
    if (!req.file) {
      const response = await getResponse(prompt, historiques);
      await ChatBot.create({
        userId: req.auth.userId,
        prompt,
        response,
      });
      res.status(200).json({
        response,
      });
      return;
    }
//case it's prompt with image
    const imgPath = `${path.join(__dirname, ".." ,"images")}/${req.file.filename}`;

    const response = await ableChatFromImage(imgPath, prompt);
    await ChatBot.create({
      userId: req.auth.userId,
      prompt: ` I send an image. ${prompt}`,
      response,
    });
    res.status(200).json({ response });

    //
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

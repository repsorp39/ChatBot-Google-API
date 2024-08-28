const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const ChatBot = require("../models/Conversation");
const mime = require("mime-types");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//Function to generate chat completion
module.exports.getResponse = async (prompt, historique) => {
  const chat = model.startChat({
    history: historique,
    generationConfig: {
      maxOutputTokens: 200,
    },
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response.candidates[0].content.parts[0].text;
  return response;
};

//Function to generate chat completion based on image
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

module.exports.ableChatFromImage = async (imagePath, prompt) => {
  const mimeType = mime.lookup(imagePath);
  const imageParts = fileToGenerativePart(imagePath, mimeType);
  const result = await model.generateContent([prompt, imageParts]);
  const response = result.response;
  const text = response.text();
  return text;
};

//historiques des conversations avec le bot
module.exports.oldChatWithBot = async (userId) => {
  const histo = await ChatBot.find({ userId: userId });
  let historiques = [];

  histo.map((histo) => {
    let discu = {
      role: "user",
      parts: [{ text: histo.prompt }],
    };
    historiques.push(discu);
    discu = {
      role: "model",
      parts: [{ text: histo.response }],
    };
    historiques.push(discu);
  });

  return historiques;
};

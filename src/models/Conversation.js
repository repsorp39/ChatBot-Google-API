const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("chatReplie", replySchema);

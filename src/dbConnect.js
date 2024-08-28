const mongoose = require("mongoose");

dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;

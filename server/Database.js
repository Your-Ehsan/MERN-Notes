require("dotenv").config();
const mongoose = require("mongoose"),
  mongoURI = process.env.MONGO_URL,
  ConnectMongoDB = () => {
    mongoose.connect(mongoURI).then(() => {
      console.log("🎉 MongoDB connect successfully! 🎉...");
    });
  };

module.exports = { ConnectMongoDB, mongoose };

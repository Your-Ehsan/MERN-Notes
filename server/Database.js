const mongoose = require("mongoose"),
	mongoURI = "mongodb://localhost:27017/noteapp",
	ConnectMongoDB = () => {
		mongoose.connect(mongoURI).then(() => {
			console.log("🎉 MongoDB connect successfully! 🎉...");
		});
	};

module.exports = { ConnectMongoDB, mongoose };

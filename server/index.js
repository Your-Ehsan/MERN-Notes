const { ConnectMongoDB } = require("./Database"),
  express = require("express"),
  NotesRouter = require("./routes/notes"),
  AuthRouter = require("./routes/auth"),
  cors = require("cors"),
  app = express(),
  cookieParser = require("cookie-parser");
app.use(
  cookieParser(),
  cors({ credentials: true, origin: "http://localhost:4173" })
);
app.use(express.json());
// 🔥 🛣 Available Routes | 🚩
app.use("/api/auth", AuthRouter);
app.use("/api/notes", NotesRouter);

app.listen(3000, () => {
  console.log("Your app is running on --> http://localhost:3000");
});

ConnectMongoDB();

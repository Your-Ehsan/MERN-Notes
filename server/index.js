require("dotenv").config();
const { ConnectMongoDB } = require("./Database"),
  express = require("express"),
  NotesRouter = require("./routes/notes"),
  AuthRouter = require("./routes/auth"),
  cors = require("cors"),
  app = express(),
  cookieParser = require("cookie-parser");
cors({ credentials: true, origin: process.env.CLIENT_URL });
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(cookieParser());
app.use(express.json());
// 🔥 🛣 Available Routes | 🚩
app.use("/api/auth", AuthRouter);
app.use("/api/notes", NotesRouter);

app.listen(3000, () => {
  console.log("Your app is running on --> http://localhost:3000");
});

ConnectMongoDB();

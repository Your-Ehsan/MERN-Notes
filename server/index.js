const { ConnectMongoDB } = require("./Database"),
  express = require("express"),
  NotesRouter = require("./routes/notes"),
  AuthRouter = require("./routes/auth"),
  cors = require("cors"),
  corsOptions = {
    origin: "http://localhost:4173", // Replace this with your frontend's URL
  },
  app = express();

app.use(cors(corsOptions));
app.use(express.json());
// 🔥 🛣 Available Routes | 🚩
app.use("/api/auth", AuthRouter);
app.use("/api/notes", NotesRouter);

app.listen(3000, () => {
  console.log("Your app is running on --> http://localhost:3000");
});

ConnectMongoDB();

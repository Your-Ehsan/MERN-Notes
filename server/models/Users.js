const { mongoose } = require("../Database"),
  { Schema } = mongoose,
  UserSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }),
  Users = mongoose.model("users", UserSchema);
// _user.createIndexes();

module.exports = Users;

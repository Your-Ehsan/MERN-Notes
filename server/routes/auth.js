require("dotenv").config();
const { body, validationResult } = require("express-validator"),
  Users = require("../models/Users"),
  express = require("express"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  AuthRouter = express.Router(),
  fetchUser = require("../middleware/fetchUser"),
  JWT_SECRET = process.env.JWT_SECRET;

// 🔥 Create user using POST:/api/auth/createuser
AuthRouter.post(
  "/createuser",
  [
    body("email", "email is not valid!").isEmail(),
    body("name", "name should be greater then 3")
      .isString()
      .isLength({ min: 3 }),
    body("password", "password must be atleast 4 characters")
      .exists()
      .isStrongPassword()
      .isLength({
        min: 4,
      }),
  ],
  async (req, res) => {
    try {
      const _err = validationResult(req),
        { email, name } = req.body;

      if (!_err.isEmpty()) {
        return res.status(400).json({ error: _err.array() });
      }

      let _user = await Users.findOne({ email }),
        _secPas = await bcrypt.hash(
          req.body.password,
          await bcrypt.genSalt(10)
        );

      if (_user) {
        return res
          .status(400)
          .json({ error: "please provide correct credentials" });
      }

      _user = await Users.create({
        name: name,
        email: email,
        password: _secPas,
      });

      const _data = {
        user: {
          id: _user.id,
        },
      };

      res.json({ authToken: jwt.sign(_data, JWT_SECRET) });
    } catch (err) {
      console.log(err);
      res.status(500).send("some error occured");
    }
  }
);

// Login users using POST request method
AuthRouter.post(
  "/login",
  [
    body("email", "user alreday exist!").isString().isEmail(),
    body("password", "password is not valid")
      .exists()
      .isStrongPassword()
      .isLength({ min: 4 }),
  ],
  async (req, res) => {
    const error = validationResult(req),
      { email, password } = req.body;

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      let _user = await Users.findOne({ email }),
        _ComparePwd = await bcrypt.compare(password, _user.password),
        _data = {
          user: {
            id: _user.id,
          },
        };

      if (!_user) {
        return res.status(400).json({ error: "credentials are not correct" });
      }
      if (!_ComparePwd) {
        return res.status(400).json({ error: "credentials are not correct" });
      }

      res.json({ authToken: jwt.sign(_data, JWT_SECRET) });
    } catch (err) {
      console.log(err);
      res.status(500).send("some internal server error occured");
    }
  }
);

// get logged in user details 🔥 using POST: 'api/auth/'

AuthRouter.post("/getuser", fetchUser, async (req, res) => {
  try {
    const _user = await Users.findById(req.user.id).select("-password");

    if (_user) {
      res.send(_user);
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "access token expired" });
  }
});

module.exports = AuthRouter;

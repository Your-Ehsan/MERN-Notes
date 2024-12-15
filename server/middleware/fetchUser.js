require("dotenv").config();
const jwt = require("jsonwebtoken"),
  JWT_SECRET = process.env.JWT_SECRET,
  fetchUser = (req, res, callback) => {
    // Get user from jwt token
    const token = req.header("auth-token") || req.cookies.authToken,
      _data = jwt.verify(token, JWT_SECRET);

    if (!token) {
      res
        .status(401)
        .send({ error: "credentials are wrong! | token not valid" });
    }

    try {
      req.user = _data.user;
      callback();
    } catch (error) {
      console.log(error);
      res.status(401).send({ error: "credentials are wrong!" });
    }
  };

module.exports = fetchUser;

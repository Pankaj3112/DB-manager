const jwt = require("jsonwebtoken");
require("dotenv").config();

const validUser = {
  Username: "mantiseye",
  Password: "mantiseye2024",
};

module.exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields." });
  }

  if (username != validUser.Username || password != validUser.Password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid credentials." });
  }

  const token = jwt.sign(
    {
      username: validUser.Username,
    },
    process.env.JWT_SECRET
  );

  return res.status(200).json({ success: true, token });
};

module.exports.isLoggedIn = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied." });
  }

  token = token.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ success: false, message: "Token is not valid." });
  }
};

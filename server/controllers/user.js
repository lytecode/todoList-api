const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  register: async (req, res, next) => {
    const { name, password, email } = req.body;

    //validate user request
    if (!name || !password || !email) {
      return res.status(400).json({ message: "All fields are rquired" });
    }

    //check if the user already exist
    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({ message: "User already registered, please login" });

    //salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      //create a new User and save
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      });

      res.status(201).json({
        message: "New user created",
        user: { id: newUser._id, name: newUser.name }
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error while creating account: ${err}` });
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    //validate user request
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if user exist
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    //compare the password with that in the db
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    //sign a JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      config.JWT_SECRET,
      { expiresIn: config.TOKEN_EXPIRESIN }
    );

    res
      .header("auth-token", token)
      .status(200)
      .json({
        message: "Successfully logged in",
        user: { id: user._id, name: user.name }
      });
  }
};

const { validationResult } = require("express-validator");
const userModel = require("../models/User.model");
const userService = require("../services/user.service");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;

  console.log(req.body);

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res
    .status(201)
    .json({ message: "User created successfully", user: user, token: token });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  const isMatchPassword = await user.comparePassword(password);
  if (!isMatchPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }
  res.status(200).json({ message: "Login successful", user: user });
};

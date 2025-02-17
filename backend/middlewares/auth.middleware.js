const userModel = require("../models/User.model");
const DriverModel = require("../models/Driver.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/BlackListToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ message: "User has logged out" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token was found but not correct",
      error: error.message,
    });
  }
};
module.exports.authDriver = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  const isBlackListed = await blackListTokenModel.findOne({ token: token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Driver has logged out" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const driver = await DriverModel.findById(decoded._id);
    console.log(driver);
    req.driver = driver;
    console.log("Request Object", req.driver);
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Token was found but not correct",
      error: error.message,
    });
  }
};

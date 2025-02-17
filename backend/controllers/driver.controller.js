const DriverModel = require("../models/Driver.model");
const driverService = require("../services/driver.service");
const blackListTokenModel = require("../models/BlackListToken.model");
const { validationResult } = require("express-validator");

module.exports.registerDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password, vehicle } = req.body;

  const isDriverAlreadyExist = await DriverModel.findOne({ email });
  if (isDriverAlreadyExist) {
    return res
      .status(400)
      .json({ message: "Driver with this email already exists.Please login." });
  }

  const hashedPassword = await DriverModel.hashPassword(password);

  const driver = await driverService.createDriver({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  //   generate a token for the driver
  const token = driver.generateToken();
  return res.status(201).json({ token: token, driver: driver });
};

module.exports.loginDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const driverRes = await driverService.findDriver({ email, password, res });
  return driverRes;
};
module.exports.getDriverProfile = async (req, res, next) => {
  try {
    res.status(200).json({ driver: req.driver });
  } catch (e) {
    res.status(500).send(e.message);
  }
};
module.exports.logOutDriver = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie("token");
    await blackListTokenModel.create({ token });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

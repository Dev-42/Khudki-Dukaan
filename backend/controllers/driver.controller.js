const DriverModel = require("../models/Driver.model");
const driverService = require("../services/driver.service");
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

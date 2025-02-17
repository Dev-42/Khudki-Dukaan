const DriverModel = require("../models/Driver.model");

module.exports.createDriver = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All the feilds are required");
  }
  const driver = await DriverModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });
  return driver;
};
module.exports.findDriver = async ({ email, password, res }) => {
  if (!email || !password) {
    throw new Error("All feilds are required to login");
  }
  const driver = await DriverModel.findOne({ email }).select("+password");
  if (!driver) {
    return res.status(401).json({ message: "Invalid email" });
  }
  const isMatchPassword = await driver.comparePassword(password);
  if (!isMatchPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = driver.generateToken();
  res.cookie("token", token);
  return res
    .status(200)
    .json({ message: "Login successful", driver: driver, token: token });
};

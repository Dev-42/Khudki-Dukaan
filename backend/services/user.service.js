const userModel = require("../models/User.model");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !email || !password) {
    throw new Error("All feilds are required");
  }
  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });
  return user;
};
module.exports.findUser = async ({ email, password, res }) => {
  if (!email || !password) {
    throw new Error("All feilds are required to login");
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  const isMatchPassword = await user.comparePassword(password);
  if (!isMatchPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = user.generateAuthToken();
  res.cookie("token", token);
  return res
    .status(200)
    .json({ message: "Login successful", user: user, token: token });
};

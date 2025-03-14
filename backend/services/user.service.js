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
module.exports.findUser = async ({ email, password }) => {
  if (!email || !password) {
    return { error: "All fields are required to login", status: 400 };
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return { error: "Invalid email", status: 401 };
  }

  const isMatchPassword = await user.comparePassword(password);
  if (!isMatchPassword) {
    return { error: "Invalid password", status: 401 };
  }

  const token = user.generateAuthToken();
  return { message: "Login successful", user, token, status: 200 };
};

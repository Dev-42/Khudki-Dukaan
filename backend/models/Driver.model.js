const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const driverSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color must be at least 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["scooter", "bike", "cycle"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

driverSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};
driverSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
driverSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const DriverModel = mongoose.model("Driver", driverSchema);

module.exports = DriverModel;

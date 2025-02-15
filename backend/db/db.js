const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Error connecting to DB", error.message);
  }
};
module.exports = connectToDB;

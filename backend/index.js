const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("../backend/db/db");
const userRoutes = require("../backend/routes/user.routes");
const driverRoutes = require("../backend/routes/driver.routes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoutes);
app.use("/drivers", driverRoutes);

module.exports = app;

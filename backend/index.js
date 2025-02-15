const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDB = require("../backend/db/db");
const userRoutes = require("../backend/routes/user.routes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/users", userRoutes);

module.exports = app;

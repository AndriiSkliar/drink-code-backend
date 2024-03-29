const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const drinksRouter = require("./routes/api/drinks");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const filtersRouter = require("./routes/api/filters");
const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/filters", filtersRouter);
app.use("/api/drinks", drinksRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

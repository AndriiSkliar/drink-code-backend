const express = require("express");
const ctrl = require("../../controllers/drinks");

const {
  authenticate, isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/drink");


const router = express.Router();



module.exports = router;
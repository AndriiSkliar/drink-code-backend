const express = require("express");
const ctrl = require("../../controllers/drinks");
const getHomePageDrinks = require("../../controllers/drinks/getHomePageDrinks");

const { authenticate, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/drink");

const router = express.Router();

router.get("/mainpage", authenticate, getHomePageDrinks);

module.exports = router;

const express = require("express");

const ctrl = require("../../controllers/drinks");

const { authenticate } = require("../../middlewares/index");

const router = express.Router();

router.get("/mainpage", authenticate, ctrl.getHomePageDrinks);

module.exports = router;

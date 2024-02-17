const express = require("express");
const { getHomePageDrinks } = require('../../controllers/drinks/index');


// const { validateBody, isValidId, authenticate } = require("../../middlewares/index");

// const { schemas } = require("../../models/drink");

const router = express.Router();

router.get("/mainpage", //authenticate,
 getHomePageDrinks);





module.exports = router;

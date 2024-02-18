const express = require("express");
const ctrl = require("../../controllers/drinks/getAllDrinks");
const filter = require("../../controllers/filters/filters");

const authenticate = require("../../middlewares/authenticate");
// const { schemas } = require("../../models/drink");


const router = express.Router();

router.get('/', authenticate, ctrl.getDrinks)
router.get('/filters', authenticate, filter.getDrinks)
router.get('/filters/category', authenticate, filter.getDrinksByCategory)
router.get('/filters/ingredients', authenticate, filter.getDrinksByIngredient)
module.exports = router;
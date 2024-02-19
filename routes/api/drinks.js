const express = require("express");
const ctrlAll = require("../../controllers/drinks/getAllDrinks");
const filter = require("../../controllers/filters/filters");

const authenticate = require("../../middlewares/authenticate");


const router = express.Router();

router.get('/', authenticate, ctrlAll.getAllDrinks)
router.get('/filters', authenticate, filter.getDrinks)
router.get('/filters/category', authenticate, filter.getDrinksByCategory)
router.get('/filters/ingredients', authenticate, filter.getDrinksByIngredient)
module.exports = router;
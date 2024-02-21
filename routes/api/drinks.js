const express = require("express");
const jsonParser = express.json();
const router = express.Router();

const {
  getById,
  getHomePageDrinks,
  addDrink,
  getOwnDrinks,
  removeOwnDrink,
} = require("../../controllers/drinks");

const {
  getDrinksByCategory,
  getDrinks,
  getAllDrinks,
  getDrinksByIngredient,
} = require("../../controllers/filters");

const { isValidId, authenticate, upload } = require("../../middlewares");

// const { schemas } = require("../../models/drink");

// GET/mainpage Отримання коктейлів для головної сторінки
router.get("/mainpage", authenticate, getHomePageDrinks);

// GET/popular Отримання популярних  коктейлів

// GET/search Отримання коктейлів по категорії + інгредієнту + ключовому слову

router.get("/", authenticate, getAllDrinks);
router.get("/search", authenticate, getDrinks);
router.get("/search/category", authenticate, getDrinksByCategory);
router.get("/search/ingredients", authenticate, getDrinksByIngredient);

// POST/own/add Додавання власного коктейлю
router.post(
  "/own/add",
  upload.single("drinkThumb"),
  authenticate,
  jsonParser,
  addDrink
);

// GET/own Отримання власних коктейлів
router.get("/own", authenticate, getOwnDrinks);

// POST/favorite/add/ Додавання коктейлю до обраних
// DELETE/favorite/remove/ Видалення коктейлю з обраних

// DELETE/own/remove Видалення власного коктейлю
router.delete("/own/remove/:id", authenticate, isValidId, removeOwnDrink);

// GET/:id Отримання одного коктейлю за ID
router.get("/:id", authenticate, isValidId, getById);

module.exports = router;

const express = require("express");
const jsonParser = express.json();
const router = express.Router();

const {
  getById,
  getHomePageDrinks,
  addDrink,
  getOwnDrinks,
  removeOwnDrink,
  getFavorites,
  removeFromFavorites,
  addToFavorites,
} = require("../../controllers/drinks");

const {
  getDrinksByCategory,
  getPopularDrinks,
  getDrinks,
  getAllDrinks,
  getDrinksByIngredient,
} = require("../../controllers/filters");

const {
  isValidId,
  authenticate,
  upload,
} = require("../../middlewares");



// GET/mainpage Отримання коктейлів для головної сторінки
router.get("/mainpage", authenticate, getHomePageDrinks);

// GET/search Отримання коктейлів по категорії + інгредієнту + ключовому слову

router.get("/", authenticate, getAllDrinks);

// GET/popular Отримання популярних  коктейлів
router.get("/popular", authenticate, getPopularDrinks);

router.get("/search", authenticate, jsonParser, getDrinks);
router.get(
  "/search/category",
  authenticate,
  jsonParser,
  getDrinksByCategory
);
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

router.get("/favorites", authenticate, getFavorites);
router.delete("/favorites/remove/:id", authenticate, removeFromFavorites);
router.post("/favorites/add/:id", authenticate, addToFavorites);

// DELETE/own/remove Видалення власного коктейлю
router.delete("/own/remove/:id", authenticate, isValidId, removeOwnDrink);

// GET/:id Отримання одного коктейлю за ID
router.get("/:id", authenticate, isValidId, getById);

module.exports = router;

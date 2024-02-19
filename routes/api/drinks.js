const express = require("express");

const ctrl = require("../../controllers/drinks/getById");
const getHomePageDrinks = require("../../controllers/drinks/getHomePageDrinks");

const { isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/drink");

const router = express.Router();

router.get("/mainpage", authenticate, getHomePageDrinks) // GET/mainpage Отримання коктейлів для головної сторінки
// GET/popular Отримання популярних  коктейлів
// GET/search Отримання коктейлів по категорії + інгредієнту + ключовому слову

// GET/:id Отримання одного коктейлю за ID
router.get("/:id", authenticate, isValidId, ctrl.getById);

// POST/own/ add Додавання власного коктейлю
// DELETE/own/remove Видалення власного коктейлю
// GET/own Отримання власних коктейлів
// POST/favorite/add/ Додавання коктейлю до обраних
// DELETE/favorite/remove/ Видалення коктейлю з обраних
// GET/favorite Отримання коктейлів з обраних



module.exports = router;

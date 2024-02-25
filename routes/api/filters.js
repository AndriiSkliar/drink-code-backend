const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middlewares");

const {
  getAllIngredients,
  getAllGlasses,
  getAllCategories,
} = require("../../controllers/filters");

// GET/categories Отримання списку категорій коктейлів
router.get("/categories", authenticate, getAllCategories);

// GET/ingredients Отримання списку інгредієнтів
router.get("/ingredients", authenticate, getAllIngredients);

// GET/glasses Отримання списку тари для сервірування
router.get("/glasses", authenticate, getAllGlasses);

module.exports = router;

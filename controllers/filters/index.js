const { ctrlWrapper } = require("../../helpers");

const getDrinks = require("./getDrinks");
const getDrinksByCategory = require("./getDrinksByCategory");
const getAllDrinks = require("./getAllDrinks");
const getDrinksByIngredient = require("./getDrinksByIngredient");
const getPopularDrinks = require("./getPopularDrinks");
const getAllIngredients = require("./getAllIngredients");
const getAllGlasses = require("./getAllGlasses");
const getAllCategories = require("./getAllCategories");
const getDrinksByFilters = require("./getDrinksByFilters");

module.exports = {
  getDrinks: ctrlWrapper(getDrinks),
  getDrinksByCategory: ctrlWrapper(getDrinksByCategory),
  getAllDrinks: ctrlWrapper(getAllDrinks),
  getDrinksByIngredient: ctrlWrapper(getDrinksByIngredient),
  getPopularDrinks: ctrlWrapper(getPopularDrinks),
  getAllIngredients: ctrlWrapper(getAllIngredients),
  getAllGlasses: ctrlWrapper(getAllGlasses),
  getAllCategories: ctrlWrapper(getAllCategories),
  getDrinksByFilters: ctrlWrapper(getDrinksByFilters),
};

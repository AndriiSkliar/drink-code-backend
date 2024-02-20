const { ctrlWrapper } = require("../../helpers");

const getDrinks = require("./getDrinks");
const getDrinksByCategory = require("./getDrinksByCategory");
const getAllDrinks = require("./getAllDrinks");
const getDrinksByIngredient = require("./getDrinksByIngredient");

module.exports = {
  getDrinks: ctrlWrapper(getDrinks),
  getDrinksByCategory: ctrlWrapper(getDrinksByCategory),
  getAllDrinks: ctrlWrapper(getAllDrinks),
  getDrinksByIngredient: ctrlWrapper(getDrinksByIngredient),
};

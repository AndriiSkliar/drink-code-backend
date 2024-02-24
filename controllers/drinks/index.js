const { ctrlWrapper } = require("../../helpers");

const addDrink = require("./addDrink");
const getById = require("./getById");
const getHomePageDrinks = require("./getHomePageDrinks");
const getOwnDrinks = require("./getOwnDrinks");
const removeOwnDrink = require("./removeOwnDrink");
const getFavorites = require("../drinks/getFavorites");
const removeFromFavorites = require("../drinks/removeFromFavorites");
const addToFavorites = require("../drinks/addToFavorites");

module.exports = {
  addDrink: ctrlWrapper(addDrink),
  getById: ctrlWrapper(getById),
  getHomePageDrinks: ctrlWrapper(getHomePageDrinks),
  getOwnDrinks: ctrlWrapper(getOwnDrinks),
  removeOwnDrink: ctrlWrapper(removeOwnDrink),
  getFavorites: ctrlWrapper(getFavorites),
  removeFromFavorites: ctrlWrapper(removeFromFavorites),
  addToFavorites: ctrlWrapper(addToFavorites),
};

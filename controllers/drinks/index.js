const { ctrlWrapper } = require("../../helpers");

const addDrink = require("./addDrink");
const getById = require("./getById");
const getHomePageDrinks = require("./getHomePageDrinks");
const getOwnDrinks = require("./getOwnDrinks");
const removeOwnDrink = require("./removeOwnDrink");

module.exports = {
  addDrink: ctrlWrapper(addDrink),
  getById: ctrlWrapper(getById),
  getHomePageDrinks: ctrlWrapper(getHomePageDrinks),
  getOwnDrinks: ctrlWrapper(getOwnDrinks),
  removeOwnDrink: ctrlWrapper(removeOwnDrink),
};

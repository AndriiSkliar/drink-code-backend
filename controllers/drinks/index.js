const { ctrlWrapper } = require("../../helpers");

const getHomePageDrinks = require("./getHomePageDrinks");

module.exports = {
  getHomePageDrinks: ctrlWrapper(getHomePageDrinks),
};

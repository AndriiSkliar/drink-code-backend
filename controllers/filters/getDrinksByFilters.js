const { Drink } = require("../../models/drink");
const { fullYearsCount } = require("../../helpers");

const getDrinksByFilters = async (req, res) => {
  const { drink, category, ingredient } = req.query;
  const { birthday } = req.user;
  const fullYears = await fullYearsCount(birthday);
  const isAdult = fullYears >= 18 ? "" : "Non alcoholic";

  const query = {};

  if (drink) query.drink = { $regex: drink, $options: "i" };
  if (category) query.category = { $regex: category, $options: "i" };
  if (ingredient)
    query["ingredients.title"] = { $regex: ingredient, $options: "i" };
  query.alcoholic = { $regex: isAdult, $options: "i" };

  const categories = await Drink.find(query);

  res.status(200).json(categories);
};

module.exports = getDrinksByFilters;

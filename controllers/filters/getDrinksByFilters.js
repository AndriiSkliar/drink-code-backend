const { Drink } = require("../../models/drink");
const { fullYearsCount } = require("../../helpers");

const getDrinksByFilters = async (req, res) => {
  const { drink, category, ingredient } = req.body;
    const { birthday } = req.user;
  const fullYears = await fullYearsCount(birthday);
  const isAdult = fullYears >= 18 ? "Alcoholic" : "Non alcoholic";

  const categories = await Drink.find({})
    .find(drink ? { $or: [{ drink: { $regex: drink, $options: "i" } }, { category: { $regex: drink, $options: "i" } }] } : {})
    .find(category ? { category: { $regex: category, $options: "i" } } : {})
    .find(ingredient ? { $or: [{ "ingredients.title": ingredient }] } : {})
    .find(isAdult ? { alcoholic: {$regex: isAdult, $options: "i" } } : {});

  res.status(200).json(categories);
};

module.exports = getDrinksByFilters;
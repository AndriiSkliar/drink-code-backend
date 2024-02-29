const { Drink } = require("../../models/drink");
const { fullYearsCount, HttpError } = require("../../helpers");

const getDrinksByFilters = async (req, res) => {
  const { category, ingredient, drink, page = 1, limit = 10 } = req.query;
  const { birthday } = req.user;
  const skip = (page - 1) * limit;
  const fullYears = await fullYearsCount(birthday);
  const alcoholic = fullYears >= 18 ? "" : "Non alcoholic";
  const query = {};

  category && (query.category = category);
  ingredient &&
    (query.ingredients = {
      $elemMatch: { $or: [{ title: { $regex: ingredient, $options: "i" } }] },
    });
  drink && (query.drink = { $regex: drink, $options: "i" });
  alcoholic && (query.alcoholic = alcoholic);

  const drinks = await Drink.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  if (!drinks) {
    throw HttpError(404, "Drink is not found");
  }

  res.status(200).json({ drinks });
};

module.exports = getDrinksByFilters;

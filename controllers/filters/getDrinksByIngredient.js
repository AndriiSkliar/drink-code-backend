const { Drink } = require("../../models/drink");

const getDrinksByIngredient = async (req, res) => {
  const { ingredient } = req.query;
  console.log(ingredient);
  const drinks = await Drink.find({});

  const selectedTags = [ingredient];
  const drinksFilter = drinks.filter(({ ingredients: arr }) =>
    arr.some((ingredient) => selectedTags.includes(ingredient.title))
  );

  res.json(drinksFilter);
};
module.exports = getDrinksByIngredient;

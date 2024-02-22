const { Drink } = require("../../models/drink");

const getDrinksByIngredient = async (req, res) => {
  const { searchIngredient } = req.body;
  console.log(searchIngredient);
  const drinks = await Drink.find({});

  const drinksFilter = await drinks.filter((drink) =>
    drink.ingredients.some((ingredient) =>
      ingredient.title.includes(searchIngredient)
    )
  );

  res.json(drinksFilter);
};
module.exports = getDrinksByIngredient;

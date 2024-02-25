const { Drink } = require("../../models/drink");

const getDrinksByIngredient = async (req, res) => {
  const { searchIngredient } = req.body;
  console.log(searchIngredient);
  const drinks = await Drink.find({});
  // const drinksFilter = await drinks.filter((drink) =>
  //   drink.ingredients.forEach((ingredient) =>
  //     ingredient.title.includes(searchIngredient)
  //   )

  // );
  const selectedTags = [searchIngredient];
  const drinksFilter = drinks.filter(({ ingredients: arr }) =>
    arr.some((ingredient) => selectedTags.includes(ingredient.title))
  );

  res.json(drinksFilter);
};
module.exports = getDrinksByIngredient;

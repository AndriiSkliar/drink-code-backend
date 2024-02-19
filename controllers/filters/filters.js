const { Drink } = require("../../models/drink");

async function getDrinks(req, res, next) {
  const { letter } = req.body;

  try {
    const drinks = await Drink.find({});
    const drinksFilter = await drinks.filter((drink) =>
      drink.drink.toLowerCase().includes(letter.toLowerCase())
    );
    res.json(drinksFilter);
  } catch (error) {
    next(error);
  }
}
async function getDrinksByCategory(req, res, next) {
  const { category } = req.body;
  try {
    const drinks = await Drink.find({});
    const drinksFilter = await drinks.filter((drink) =>
      drink.category.toLowerCase().includes(category.toLowerCase())
    );
    res.json(drinksFilter);
  } catch (error) {
    next(error);
  }
}

async function getDrinksByIngredient(req, res, next) {
  const { searchIngredient } = req.body;

  try {
    const drinks = await Drink.find({});

    const drinksFilter = await drinks.filter((drink) =>
      drink.ingredients.some((ingredient) =>
        ingredient.title.includes(searchIngredient)
      )
    );

    res.json(drinksFilter);
  } catch (error) {
    next(error);
  }
}
module.exports = { getDrinks, getDrinksByCategory, getDrinksByIngredient };

// const { HttpError} = require("../../helpers");
const {Drink} = require("../../models/drink");

async function getDrinks(req, res, next) {
    const {letter} = req.body;
    // console.log(drinkLetter);
    try {
  
      const drinks = await Drink.find({});
        const drinksFilter = await drinks.filter(drink => drink.drink.toLowerCase()
        .includes(letter.toLowerCase()));
      res.json(drinksFilter);
    } catch (error) {
      next(error);
    }
  }
  async function getDrinksByCategory(req, res, next) {
    // const {category} = req.body;
    // // console.log(drinkLetter);
    // try {
  
    //   const drinks = await Drink.find({});
    //     const drinksFilter = await drinks.filter(drink => drink.category.toLowerCase()
    //     .includes(category.toLowerCase()));
    //   res.json(drinksFilter);
    // } catch (error) {
    //   next(error);
    // }
  }

  async function getDrinksByIngredient(req, res, next) {
    const {ingredien} = req.body;
    console.log(ingredien);
    try {
  
      const drinks = await Drink.find({});
      // console.log(drinks.ingredients);
        const drinksFilter = await drinks.filter(drink => drink.ingredients.filter(ingredient => ingredient.title.
        includes(ingredien)));
      res.json(drinksFilter);
    } catch (error) {
      next(error);
    }
  }
module.exports = { getDrinks, getDrinksByCategory, getDrinksByIngredient }
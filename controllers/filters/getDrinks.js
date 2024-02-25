const { Drink } = require("../../models/drink");

const getDrinks = async (req, res) => {
  
  const { letter } = req.query;

  const drinks = await Drink.find({});
  const drinksFilter = await drinks.filter((drink) =>
    drink.drink.toLowerCase().includes(letter.toLowerCase())
  );
  res.json(drinksFilter);
};

module.exports = getDrinks;

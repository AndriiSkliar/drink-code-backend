const { Drink } = require("../../models/drink");

const getAllDrinks = async (req, res) => {
  const { isAdult } = req.user;
  const noAlc = "Non alcoholic";

  if (!isAdult) {
    const drinks = await Drink.find({});
    const drinksFilter = await drinks.filter((drink) =>
      drink.alcoholic.includes(noAlc)
    );
    res.json(drinksFilter);
  }

  if (isAdult) {
    const drinks = await Drink.find({});

    res.json(drinks);
  }
};

module.exports = getAllDrinks;

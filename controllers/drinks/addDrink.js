const { Drink } = require("../../models/drink");

const addDrink = async (req, res, next) => {
  const {
    drink,
    drinkAlternate,
    tags,
    video,
    category,
    IBA,
    alcoholic,
    glass,
    description,
    instruction,
    instructionsES,
    instructionsDE,
    instructionsFR,
    instructionsIT,
    instructionsRU,
    instructionsPL,
    instructionsUK,
    drinkThumb,
    ingredients,
    shortDescription,
  } = req.body;

  const drinkData = {
    drink,
    drinkAlternate,
    tags,
    video,
    category,
    IBA,
    alcoholic,
    glass,
    description,
    instruction,
    instructionsES,
    instructionsDE,
    instructionsFR,
    instructionsIT,
    instructionsRU,
    instructionsPL,
    instructionsUK,
    drinkThumb,
    ingredients,
    shortDescription:
      shortDescription !== undefined ? shortDescription : description,
  };
  try {
    await Drink.create(drinkData);
    res.send({ message: "Drink Created" });
  } catch (error) {
    next(error);
  }
};

module.exports = addDrink;

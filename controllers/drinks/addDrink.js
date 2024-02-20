const { Drink, drinkJoiSchema } = require('../../models/drink');

const cloudinary = require('cloudinary');

const addDrink = async (req, res, next) => {
  const response = drinkJoiSchema.validate(req.body, { abortEarly: false });
  if (response.error) {
    return res.status(400).send({ message: `${response.error}` });
  }

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
    drinkThumb: req.file && req.file.path,
    ingredients,
    shortDescription:
      shortDescription !== undefined ? shortDescription : description,
  };
  try {
    await Drink.create(drinkData);
    res.status(201).send({ message: 'Drink Created' });
  } catch (error) {
    next(error);
  }
};

module.exports = addDrink;

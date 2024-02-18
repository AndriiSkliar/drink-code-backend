const { Drink } = require("../../models/drink");
const { Ingredient } = require("../../models/ingridents");

const { HttpError, ctrlWrapper } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Drink.findById(id).populate("ingredients.ingredientId");

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};

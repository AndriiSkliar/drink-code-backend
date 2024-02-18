const { Drink } = require("../../models/drink");

const { HttpError, ctrlWrapper } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Drink.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
};

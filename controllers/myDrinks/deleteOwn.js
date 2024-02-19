const HttpError = require("../../helpers");
const Drink = require("../../models/drink");

const deleteOwn = async (req, res) => {
  const { id } = req.params;
  const { _id: currentUser } = req.user;

  const result = await Drink.findById(id);

  if (!result) {
    throw HttpError(404, "Not Found");
  }

  if (result.owner.toString() !== currentUser.toString()) {
    throw HttpError(403, "User is not authorized to delete this drink");
  }

  const removedDrink = await Drink.findByIdAndRemove(id);

  res.json({ result: removedDrink });
};

module.exports = deleteOwn;

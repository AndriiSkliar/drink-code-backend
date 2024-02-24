const { HttpError } = require("../../helpers");
const { Drink } = require("../../models/drink");

const addToFavorites = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const drink = await Drink.findById(id);
  if (!drink) {
    throw HttpError(404, "Not Found");
  }
  if (!drink.users) {
    drink.users = [];
  }
  const isFavorite = drink.users.includes(userId);
  let result;
  if (isFavorite) {
    throw HttpError(409, `${drink.drink} is already in your favorites.`);
  } else {
    result = await Drink.findByIdAndUpdate(
      drink._id,
      { $push: { users: userId } },
      { new: true }
    );
  }
  res.json({ result });
};

module.exports = addToFavorites;

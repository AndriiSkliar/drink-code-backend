const { Drink } = require("../../models/drink");
const { HttpError } = require("../../helpers");

const removeFromFavorites = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const drink = await Drink.findById(id);

  const isFavorite = drink.users.includes(userId);

  if (!isFavorite) {
    throw HttpError(
      409,
      `${drink.drink} is already delete from your favorites.`
    );
  }
  const result = await Drink.findByIdAndUpdate(
    drink._id,
    { $pull: { users: userId } },
    { new: true }
  );

  res.json({ result });
};

module.exports = removeFromFavorites;

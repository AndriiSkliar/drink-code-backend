const { Drink } = require("../../models/drink");

const getFavorites = async (req, res) => {
  const { _id: userId } = req.user;
  // const { page = 1, limit = 9 } = req.query;
  // const skip = (page - 1) * limit;

  const result = await Drink.find({
    users: {
      $elemMatch: {
        $eq: userId,
      },
    },
  }).sort({ createdAt: -1 });
  // .skip(skip)
  // .limit(limit);

  const totalFavoriteDrinks = await Drink.countDocuments({
    users: {
      $elemMatch: {
        $eq: userId,
      },
    },
  });

  res.json({ total: totalFavoriteDrinks, drinks: result });
};

module.exports = getFavorites;

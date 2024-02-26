const { Drink } = require("../../models/drink");

const getOwnDrinks = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Drink.find({
    users: {
      $elemMatch: {
        $eq: owner,
      },
    },
  }).sort({ createdAt: -1 });
  const totalOwnDrinks = await Drink.countDocuments({
    users: {
      $elemMatch: {
        $eq: owner,
      },
    },
  });

  res.json({ total: totalOwnDrinks, drinks: result });
};

module.exports = getOwnDrinks;

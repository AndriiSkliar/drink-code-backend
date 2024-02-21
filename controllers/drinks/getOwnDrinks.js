const { Drink } = require("../../models/drink");

const getOwnDrinks = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Drink.find({ owner })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalOwnDrinks = await Drink.countDocuments({ owner });

  res.json({ total: totalOwnDrinks, drinks: result });
};

module.exports = getOwnDrinks;

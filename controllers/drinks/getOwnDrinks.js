const { Drink } = require("../../models/drink");

const getOwnDrinks = async (req, res) => {
  const { _id: ownerID } = req.user;

  const result = await Drink.find({
    owner: ownerID,
  }).sort({ createdAt: -1 });
  const totalOwnDrinks = await Drink.countDocuments({
    owner: ownerID,
  });

  res.json({ total: totalOwnDrinks, drinks: result });
};

module.exports = getOwnDrinks;

const { Drink } = require("../../models/drink");

const getDrinksByFilters = async (req, res) => {
  const { category, ingredient, drink, page, limit } = req.body;
  const { birthday } = req.user;
  //   const pageNumber = parseInt(page) || 1;
  //   const limitNumber = parseInt(limit) || 10;
  //   const skip = (pageNumber - 1) * limitNumber;
  const query = {};

  category && (query.category = category);
  ingredient &&
    (query.ingredients = {
      $elemMatch: {
        $or: [{ title: { $regex: ingredient, $options: "i" } }],
      },
    });
  drink && (query.drink = { $regex: drink, $options: "i" });

  const drinks = await Drink.find(query);

  res.status(200).json({ drinks });
};

module.exports = getDrinksByFilters;

const { Ingredient } = require("../../models/ingridents");

const getAllIngredients = async (req, res) => {
  const ingredients = await Ingredient.find();

  if (ingredients.length === 0) {
    return res.status(404).json({ message: "No ingredients found" });
  }

  const ingredientsWithIds = ingredients.map(({ _id, title }) => ({
    id: _id,
    title,
  }));

  res.status(200).json(ingredientsWithIds);
};

module.exports = getAllIngredients;

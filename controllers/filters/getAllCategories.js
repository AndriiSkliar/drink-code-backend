const { categories } = require("../../db/categories");

const getAllCategories = async (req, res) => {
  const categoriesList = await categories.listCategories();

  if (!categoriesList || categoriesList.length === 0) {
    return res.status(404).json({ message: "No categories found" });
  }

  res.status(200).json(categoriesList);
};

module.exports = getAllCategories;

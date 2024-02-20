const { Drink } = require("../../models/drink");

const getDrinksByCategory = async (req, res) => {
    const { category } = req.body;
    
   const drinks = await Drink.find({});
   const drinksFilter = await drinks.filter((drink) =>
     drink.category.toLowerCase().includes(category.toLowerCase())
   );
   res.json(drinksFilter);
};

module.exports = getDrinksByCategory;

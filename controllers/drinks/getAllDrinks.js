// const { HttpError} = require("../../helpers");
const {Drink} = require("../../models/drink");
// const path = require("path");
// const fs = require("fs/promises");
// const categoriesPath = path.join(__dirname, "../", "db/categories/", "categories.json");

// const getDrinks = async (req, res) => {
//     const {isAdult} = req.user;
//     const drinks = {};
//     const categories = await fs.readFile(categoriesPath);
//     console.log(categories)
//     const parsedCategories = JSON.parse(categories);
//     const totalCount = await Drink.count();
//     for (const category of parsedCategories) {
//       drinks[category] = await Drink.find(
//         !isAdult
//           ? {
//               category,
//               alcoholic: "Non alcoholic",
//             }
//           : { category }
//       )
//         .sort({ createdAt: -1 })
//     }
//     res.json({
//       code: 200,
//       message: 'Success operation',
//       totalDrinks: totalCount,
//       mainPageDrinks: drinks});
//   };
async function getDrinks(req, res, next) {
    const {isAdult} = req.user;
    console.log(isAdult)
    try {
  
      const drinks = await Drink.find({});
        
      res.json(drinks);
    } catch (error) {
      next(error);
    }
  }


module.exports = { getDrinks }
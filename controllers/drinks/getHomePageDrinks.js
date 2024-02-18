const { Drink } = require("../../models/drink"); 

const getHomePageDrinks = async (req, res, next) => {
  try {
    const { isAdult } = req.user;
    // console.log('isAdult:', isAdult)
    // console.log(' req.user:',  req.user)

    let drinks;

    if (isAdult !== true) {
      drinks = await Drink.find({ alcoholic: "Non alcoholic" }).sort({
        createdAt: -1,  //чтобы отображались последние добавленные
        _id: -1, // если добавлены одномоментно то по убиванію id отобразятся
      });
    } else {
      drinks = await Drink.find().sort({ createdAt: -1, _id: -1 });
    }

    res.json(drinks);
  } catch (error) {
    next(error);
  }
};
module.exports = getHomePageDrinks;

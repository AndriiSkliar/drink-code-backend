// @ts-nocheck
const { Drink } = require("../../models/drink");

const getPopularDrinks = async (req, res) => {
    const { isAdult } = req.user;
    const noAlc = "Non alcoholic";

    if(isAdult) {
        const drinks = await Drink.find({});
        const drinksWithUsers = await drinks.filter(drink => drink.users.length > 0 && drink.users);
        const sortedDrinks = await drinksWithUsers.sort((a, b) => b.users - a.users);
        const popularCoctails = await sortedDrinks.slice(0, 4);
        return res.json(popularCoctails);
    }

    if(!isAdult) {
        const drinksAll = await Drink.find({});
        const nonAlcoDrinks = await drinksAll.filter((drink) => drink.alcoholic.includes(noAlc));
        const drinksWithUsersNonAlc = await nonAlcoDrinks.filter(drink => drink.users.length > 0 && drink.users);
        const sortedDrinks = await drinksWithUsersNonAlc.sort((a, b) => b.users - a.users);
        const popularCoctailsNonAlc = await sortedDrinks.slice(0, 4);
        return res.json(popularCoctailsNonAlc);
    }
}

module.exports = getPopularDrinks;
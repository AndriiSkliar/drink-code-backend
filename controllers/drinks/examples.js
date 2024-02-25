const { HttpError } = require("../../helpers");
const { Drink } = require("../../models/drink");
const User = require("../../models/user");
const { Ingredients } = require("../../models/ingredients");

const path = require("path");
const fs = require("fs/promises");
const categoriesPath = path.join(__dirname, "../", "db", "categories.json");

const getMainPageDrinks = async (req, res) => {
  const { isAdult } = req.user;
  const drinks = {};
  const categories = await fs.readFile(categoriesPath);
  const parsedCategories = JSON.parse(categories);
  const totalCount = await Drink.count();
  for (const category of parsedCategories) {
    drinks[category] = await Drink.find(
      !isAdult
        ? {
            category,
            alcoholic: "Non alcoholic",
          }
        : { category }
    ).sort({ createdAt: -1 });
  }
  res.json({
    code: 200,
    message: "Success operation",
    totalDrinks: totalCount,
    mainPageDrinks: drinks,
  });
};

const getSearchDrinks = async (req, res) => {
  const { category, ingredient, query, page = 1, limit = 10 } = req.query;
  const { isAdult } = req.user;
  const paramSearch = {};

  const skip = (page - 1) * limit;

  if (category) {
    paramSearch.category = category;
  }
  if (ingredient) {
    paramSearch.ingredients = { $elemMatch: { title: ingredient } };
  }
  if (query) {
    paramSearch.drink = { $regex: query, $options: "i" };
  }
  if (!isAdult) {
    paramSearch.alcoholic = "Non alcoholic";
  }

  const resultCount = await Drink.countDocuments(paramSearch);

  const drinks = await Drink.find(
    paramSearch,
    { drink: 1, drinkThumb: 1, category: 1, alcoholic: 1, popularity: 1 },
    { skip, limit }
  ).sort({ popularity: -1 });

  if (!resultCount || !drinks.length) {
    throw HttpError(404, "Not Found");
  }

  res.status(200).json({
    code: 200,
    message: "Success operation",
    quantityTotal: resultCount,
    data: drinks,
  });
};

const getPopularDrinks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const condition = !req.user.isAdult
    ? "Non alcoholic"
    : /^(?:Alcoholic\b|Non alcoholic\b)/;

  const result = await Drink.aggregate([
    {
      $addFields: {
        popularity: {
          $cond: {
            if: { $isArray: "$users" },
            then: { $size: "$users" },
            else: 0,
          },
        },
      },
    },
    {
      $sort: { popularity: -1 },
    },
  ])
    .match({ alcoholic: condition })
    .skip(skip)
    .limit(limit);

  res.json(result);
};

const addFavoriteDrink = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const drink = await Drink.findById(id);
  if (!drink) {
    throw HttpError(404, "Not Found");
  }
  if (!drink.users) {
    drink.users = [];
  }
  const isFavorite = drink.users.includes(userId);
  let result;
  if (isFavorite) {
    throw HttpError(409, `${drink.drink} is already in your favorites.`);
  } else {
    result = await Drink.findByIdAndUpdate(
      drink._id,
      { $push: { users: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(userId, { $inc: { userFavorite: 1 } });
  }
  res.json({ result });
};

const getFavoriteDrinks = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Drink.find({
    users: {
      $elemMatch: {
        $eq: userId,
      },
    },
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalFavoriteDrinks = await Drink.countDocuments({
    users: {
      $elemMatch: {
        $eq: userId,
      },
    },
  });

  res.json({ total: totalFavoriteDrinks, drinks: result });
};

const addOwnDrink = async (req, res) => {
  const { _id: owner } = req.user;
  const ingredients = JSON.parse(req.body.ingredients);
  console.log(req.body);

  let drinkThumb = "";
  if (req.file) {
    drinkThumb = req.file.path;
  }

  const ingredientsArr = [];

  for (const ingredient of ingredients) {
    const ingredientInfo = await Ingredient.findById(ingredient.ingredientId);

    if (!ingredientInfo) {
      throw HttpError(404, "Not Found");
    }

    const { _id: ingredientId, title } = ingredientInfo;

    ingredientsArr.push({
      title,
      ...ingredient,
      ingredientId,
    });
  }

  const drinkDB = {
    ...req.body,
    owner,
    drinkThumb,
    ingredients: ingredientsArr,
  };

  // const { error } .addDrinkSchema.validate(drinkDB);
  // if (error) throw HttpError(400, error.message);

  const drink = await Drink.create(drinkDB);

  res.status(201).json(drink);
};

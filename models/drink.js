const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const alcoholicTypes = ["Non alcoholic", "Alcoholic"];
const categoryTypes = [
  "Ordinary Drink",
  "Cocktail",
  "Shake",
  "Other/Unknown",
  "Cocoa",
  "Shot",
  "Coffee/Tea",
  "Homemade Liqueur",
  "Punch/Party Drink",
  "Beer",
  "Soft Drink",
];
const glassTypes = [
  "Highball glass",
  "Cocktail glass",
  "Old-fashioned glass",
  "Whiskey Glass",
  "Collins glass",
  "Pousse cafe glass",
  "Champagne flute",
  "Whiskey sour glass",
  "Cordial glass",
  "Brandy snifter",
  "White wine glass",
  "Nick and Nora Glass",
  "Hurricane glass",
  "Coffee mug",
  "Shot glass",
  "Jar",
  "Irish coffee cup",
  "Punch bowl",
  "Pitcher",
  "Pint glass",
  "Copper Mug",
  "Wine Glass",
  "Beer mug",
  "Margarita/Coupette glass",
  "Beer pilsner",
  "Beer Glass",
  "Parfait glass",
  "Mason jar",
  "Margarita glass",
  "Martini Glass",
  "Balloon Glass",
  "Coupe Glass",
];

const DrinkSchema = new Schema(
  {
    drink: {
      type: String,
      required: true,
    },
    drinkAlternate: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: categoryTypes,
    },
    IBA: {
      type: String,
      required: true,
    },
    alcoholic: {
      type: String,
      required: true,
      enum: alcoholicTypes,
    },
    glass: {
      type: String,
      required: true,
      enum: glassTypes,
    },
    description: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    instructionsES: {
      type: String,
      required: true,
    },
    instructionsDE: {
      type: String,
      required: true,
    },
    instructionsFR: {
      type: String,
      required: true,
    },
    instructionsIT: {
      type: String,
      required: true,
    },
    instructionsRU: {
      type: String,
      required: true,
    },
    instructionsPL: {
      type: String,
      required: true,
    },
    instructionsUK: {
      type: String,
      required: true,
    },
    drinkThumb: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        title: {
          type: String,
          required: true,
        },
        ingredientId: {
          type: Schema.Types.ObjectId,
          required: true,
        },
        shortDescription: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

DrinkSchema.post("save", handleMongooseError);

// const addDrinkSchema = Joi.object({
//   drink: Joi.string().required(),
//   drinkAlternate: Joi.string().required(),
//   tags: Joi.string().required(),
//   video: Joi.string().required(),
//   category: Joi.string()
//     .valid(...categoryTypes)
//     .required(),
//   IBA: Joi.string().required(),
//   alcoholic: Joi.string()
//     .valid(...alcoholicTypes)
//     .required(),
//   glass: Joi.string()
//     .valid(...glassTypes)
//     .required(),
//   description: Joi.string().required(),
//   instructions: Joi.string().required(),
//   instructionsES: Joi.string().required(),
//   instructionsDE: Joi.string().required(),
//   instructionsFR: Joi.string().required(),
//   instructionsIT: Joi.string().required(),
//   instructionsRU: Joi.string().required(),
//   instructionsPL: Joi.string().required(),
//   instructionsUK: Joi.string().required(),
//   drinkThumb: Joi.string().required(),
//   ingredients: Joi.array().items(
//     Joi.object({
//       title: Joi.string().required(),
//       ingredientId: Joi.string().required(),
//       shortDescription: Joi.string().required(),
//     })
//   ),
// });

// const schemas = {
//   addDrinkSchema,
// };



const Drink = model("recipes", DrinkSchema);


module.exports = {
  Drink,
  // schemas,
};

const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const drinkSchema = new Schema(
  {
    drink: {
      // required field
      type: String,
      required: [true, 'Set name for drink'],
    },
    drinkAlternate: {
      type: String,
      default: 'Sorry, not specified',
    },
    tags: {
      type: String,
      default: 'Sorry, not specified',
    },
    video: {
      type: String,
      default: 'Sorry, not specified',
    },
    category: {
      // required field
      type: String,
      required: [true, 'Choose category for a drink'],
      enum: [
        'Ordinary Drink',
        'Cocktail',
        'Shake',
        'Other/Unknown',
        'Cocoa',
        'Shot',
        'Coffee / Tea',
        'Homemade Liqueur',
        'Punch / Party Drink',
        'Beer',
        'Soft Drink',
      ],
    },
    IBA: { type: String, default: 'Sorry, not specified' },
    alcoholic: {
      // required field
      type: String,
      required: true,
      enum: ['Alcoholic', 'Non alcoholic'],
    },
    glass: {
      type: String,
      required: [true, 'Choose glass for a drink'],
      enum: [
        'Highball glass',
        'Cocktail glass',
        'Old-fashioned glass',
        'Whiskey Glass',
        'Collins glass',
        'Pousse cafe glass',
        'Champagne flute',
        'Whiskey sour glass',
        'Cordial glass',
        'Brandy snifter',
        'White wine glass',
        'Nick and Nora Glass',
        'Hurricane glass',
        'Coffee mug',
        'Shot glass',
        'Jar',
        'Irish coffee cup',
        'Punch bowl',
        'Pitcher',
        'Pint glass',
        'Copper Mug',
        'Wine Glass',
        'Beer mug',
        'Margarita/Coupette glass',
        'Beer pilsner',
        'Beer Glass',
        'Parfait glass',
        'Mason jar',
        'Margarita glass',
        'Martini Glass',
        'Balloon Glass',
        'Coupe Glass',
      ],
    },
    description: {
      // required field
      type: String,
      required: [true],
    },
    instruction: {
      // required field
      type: String,
      required: [true],
    },
    instructionsES: {
      type: String,
      default: 'none',
    },
    instructionsDE: {
      type: String,
      default: 'none',
    },
    instructionsFR: {
      type: String,
      default: 'none',
    },
    instructionsIT: {
      type: String,
      default: 'none',
    },
    instructionsRU: {
      type: String,
      default: 'none',
    },
    instructionsPL: {
      type: String,
      default: 'none',
    },
    instructionsUK: {
      type: String,
      default: 'none',
    },
    drinkThumb: {
      type: String,
      default: null,
    },
    ingredients: [
      {
        title: String,
        measure: String,
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: 'ingredient',
        },
      },
    ],
    shortDescription: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    users: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

drinkSchema.post('save', handleMongooseError);

const Drink = model('recipes', drinkSchema);

const drinkJoiSchema = Joi.object({
  drink: Joi.string().required().messages({
    'any.required': 'Missing drink name field',
    'string.base': 'The drink must be a string',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Missing drink description field',
  }),
  category: Joi.string()
    .valid(
      'Ordinary Drink',
      'Cocktail',
      'Shake',
      'Other/Unknown',
      'Cocoa',
      'Shot',
      'Coffee / Tea',
      'Homemade Liqueur',
      'Punch / Party Drink',
      'Beer',
      'Soft Drink'
    )
    .required()
    .messages({
      'any.required': 'The category field is required',
    }),
  alcoholic: Joi.string()
    .valid('Alcoholic', 'Non alcoholic')
    .required()
    .messages({
      'any.required': `missing required field 'alcoholic' of recipes`,
    }),
  glass: Joi.string()
    .valid(
      'Highball glass',
      'Cocktail glass',
      'Old-fashioned glass',
      'Whiskey Glass',
      'Collins glass',
      'Pousse cafe glass',
      'Champagne flute',
      'Whiskey sour glass',
      'Cordial glass',
      'Brandy snifter',
      'White wine glass',
      'Nick and Nora Glass',
      'Hurricane glass',
      'Coffee mug',
      'Shot glass',
      'Jar',
      'Irish coffee cup',
      'Punch bowl',
      'Pitcher',
      'Pint glass',
      'Copper Mug',
      'Wine Glass',
      'Beer mug',
      'Margarita / Coupette glass',
      'Beer pilsner',
      'Beer Glass',
      'Parfait glass',
      'Mason jar',
      'Margarita glass',
      'Martini Glass',
      'Balloon Glass',
      'Coupe Glass'
    )
    .required()
    .messages({
      'any.required': 'The glass field is required',
    }),
  ingredients: Joi.array()
    .items(
      Joi.object({
        measure: Joi.string().required(),
        title: Joi.string().required(),
      })
    )
    .min(1)
    .required()
    .messages({
      'any.required':
        'The ingredients field is required or missing required measure or title field',
      'array.min': 'The ingredients field must contain at least one ingredient',
    }),
  instruction: Joi.string(),
});

module.exports = { Drink, drinkJoiSchema };

const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const defBirthDate = new Date();

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required: example@example.com"],
      unique: [true, "Email is exists"],
      match: emailRegexp,
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required"],
      default: defBirthDate,
    },
    isAdult: {
      type: Boolean,
      default: false,
    },
    avatarURL: {
      type: String,
    },
    subscribe: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const signUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  birthday: Joi.date().required(),
});

const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateNameSchema = Joi.object({
  name: Joi.string().min(3),
});

const schemas = {
  signUpSchema,
  signInSchema,
  updateNameSchema,
  emailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};

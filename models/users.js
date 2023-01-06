const { Schema, model } = require("mongoose");

const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const schema = Joi.object({
  name: Joi.string(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
});

const updateSchema = Joi.object({
  subscription: Joi.string().allow("starter", "pro", "business"),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const schemas = { schema, updateSchema, verifyEmailSchema };
const User = model("user", userSchema);

module.exports = { User, schemas };

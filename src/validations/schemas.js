const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'any.required': 'Some required fields are missing',
      'string.empty': 'Some required fields are missing',
    }),
});

const userSchema = Joi.object({
  displayName: Joi.string()
    .min(8)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  idSchema,
  loginSchema,
  userSchema,
  categorySchema,
};
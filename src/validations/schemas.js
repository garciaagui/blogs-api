const Joi = require('joi');

const requiredFieldsMessage = 'Some required fields are missing';

const idSchema = Joi.number().integer().min(1).required();

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': requiredFieldsMessage,
      'string.empty': requiredFieldsMessage,
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'any.required': requiredFieldsMessage,
      'string.empty': requiredFieldsMessage,
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

const blogPostSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .required()
    .messages({
      'any.required': requiredFieldsMessage,
      'string.empty': requiredFieldsMessage,
    }),
  content: Joi.string()
    .min(1)
    .required()
    .messages({
      'any.required': requiredFieldsMessage,
      'string.empty': requiredFieldsMessage,
    }),
  categoryIds: Joi.array()
    .items(Joi.number().integer().min(1))
    .required()
    .messages({
      'any.required': requiredFieldsMessage,
      'string.empty': requiredFieldsMessage,
    }),
});

module.exports = {
  idSchema,
  loginSchema,
  userSchema,
  categorySchema,
  blogPostSchema,
};
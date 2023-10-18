import Joi from 'joi';

const validLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': '"username" and "password" are required"',
});

export default { validLogin };
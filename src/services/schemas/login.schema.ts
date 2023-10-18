import Joi from 'joi';

const validLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': '"username" and "password" are required',
});

export default { validLogin };
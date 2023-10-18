import Joi from 'joi';
import { ServiceResponseError } from '../../types/ServiceResponse';
import { HTTPStatus } from '../../utils/mapStatusHTTP';

function validateSchema(
  schema: Joi.ObjectSchema,
  payload: unknown,
): ServiceResponseError | undefined {
  const { error } = schema.validate(payload);

  if (error) {
    return {
      status: error.details[0].type === 'any.required'
        ? HTTPStatus.INVALID_DATA : HTTPStatus.UNPROCESSABLE,
      data: { message: error.message },
    };
  }
}

export default { validateSchema };
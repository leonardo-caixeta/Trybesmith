import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login, Token } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponse';
import loginSchema from './schemas/login.schema';
import jwtUtil from '../utils/jwt.util';
import { HTTPStatus } from '../utils/mapStatusHTTP';

async function login({ username, password }: Login): Promise<ServiceResponse<Token>> {
  const { error } = loginSchema.validLogin.validate({ username, password });
  if (error) return { status: HTTPStatus.INVALID_DATA, data: { message: error.message } };

  const user = await UserModel.findOne({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    return { status: HTTPStatus.UNAUTHORIZED, data: { message: 'Username or password invalid' } };
  }

  const token = jwtUtil.sign({ username, password });

  return { status: HTTPStatus.SUCCESSFUL, data: { token } };
}

export default { login };
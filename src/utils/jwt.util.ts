import jwt from 'jsonwebtoken';

import { Login } from '../types/Login';

const { JWT_SECRET = 'superSecreta' } = process.env;

function sign(payload: Login): string {
  const token = jwt.sign(payload, JWT_SECRET);

  return token;
}

export default { sign };
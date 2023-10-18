import { Request, Response } from 'express';
import loginService from '../services/login.service';

async function login(req: Request, res: Response) {
  const { status, data } = await loginService.login(req.body);

  return res.status(status).json(data);
}

export default { login };
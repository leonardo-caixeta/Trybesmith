import { Request, Response } from 'express';
import ordersService from '../services/orders.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function getAll(req: Request, res: Response) {
  const { status, data } = await ordersService.getAll();

  res.status(mapStatusHTTP(status)).json(data);
}

export default { getAll };
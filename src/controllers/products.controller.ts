import { Request, Response } from 'express';
import productsService from '../services/products.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function create(req: Request, res: Response) {
  const { status, data } = await productsService.create(req.body);

  const returnStatus: number = mapStatusHTTP(status);

  return res.status(returnStatus).json(data);
}

async function getAll(req: Request, res: Response) {
  const { status, data } = await productsService.getAll();

  const returnStatus: number = mapStatusHTTP(status);

  return res.status(returnStatus).json(data);
}

export default { create, getAll };
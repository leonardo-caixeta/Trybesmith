import { Request, Response } from 'express';
import productsService from '../services/products.service';

async function create(req: Request, res: Response) {
  const { status, data } = await productsService.create(req.body);

  return res.status(status).json(data);
}

async function getAll(req: Request, res: Response) {
  const { status, data } = await productsService.getAll();

  return res.status(status).json(data);
}

export default { create, getAll };
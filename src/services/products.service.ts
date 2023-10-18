import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import {
  ServiceResponseSuccess,
} from '../types/ServiceResponse';

async function create({ name, price, orderId }:ProductInputtableTypes):
Promise<ServiceResponseSuccess<Omit<Product, 'orderId'>>> {
  const created = await ProductModel.create({ name, price, orderId });

  const { orderId: idOrder, ...product } = created.dataValues;

  return { status: 'CREATED', data: product };
}

async function getAll(): Promise<ServiceResponseSuccess<Product[]>> {
  const allProducts = await ProductModel.findAll();

  const allProductsParsed = allProducts.map(({ dataValues }) => dataValues);

  return { status: 'SUCCESSFUL', data: allProductsParsed };
}

export default { create, getAll };
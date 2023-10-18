import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import {
  ServiceResponse,
  ServiceResponseSuccess,
} from '../types/ServiceResponse';
import { HTTPStatus } from '../utils/mapStatusHTTP';
import productSchema from './schemas/product.schema';
import schemaValidation from './validations/schema.validation';

async function create({ name, price, orderId }:ProductInputtableTypes):
Promise<ServiceResponse<Omit<Product, 'orderId'>>> {
  const error = schemaValidation
    .validateSchema(productSchema.validProduct, { name, price, orderId });
  if (error) return error;

  const created = await ProductModel.create({ name, price, orderId });

  const { orderId: idOrder, ...product } = created.dataValues;

  return { status: HTTPStatus.CREATED, data: product };
}

async function getAll(): Promise<ServiceResponseSuccess<Product[]>> {
  const allProducts = await ProductModel.findAll();

  const allProductsParsed = allProducts.map(({ dataValues }) => dataValues);

  return { status: HTTPStatus.SUCCESSFUL, data: allProductsParsed };
}

export default { create, getAll };
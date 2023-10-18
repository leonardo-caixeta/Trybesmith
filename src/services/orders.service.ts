import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import { OrderParsed } from '../types/Order';
import { ServiceResponse } from '../types/ServiceResponse';
import { HTTPStatus } from '../utils/mapStatusHTTP';

async function getAll(): Promise<ServiceResponse<OrderParsed[]>> {
  const allOrders = await OrderModel
    .findAll({ include: { model: ProductModel, as: 'productIds' } });

  const allOrdersParsed = allOrders.map(({ dataValues }) => ({
    ...dataValues,
    productIds: dataValues.productIds?.map(({ id }) => id),
  }));

  return { status: HTTPStatus.SUCCESSFUL, data: allOrdersParsed };
}

export default { getAll };
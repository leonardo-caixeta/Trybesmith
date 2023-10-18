import { Product } from './Product';

export type Order = {
  id: number;
  userId: number;
  productIds?: Product[];
};

export interface OrderParsed extends Omit<Order, 'productIds'> {
  productIds?: number[]
}

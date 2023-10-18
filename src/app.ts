import express from 'express';

import productRouter from './routers/products.router';
import orderRouter from './routers/orders.router';

const app = express();

app.use(express.json());

app.use(productRouter);

app.use(orderRouter);
export default app;

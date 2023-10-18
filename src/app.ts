import express from 'express';

import productRouter from './routers/products.router';
import orderRouter from './routers/orders.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());

app.use(productRouter);

app.use(orderRouter);

app.use(loginRouter);
export default app;

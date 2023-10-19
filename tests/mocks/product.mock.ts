export const productPrice = '9.99';
export const productName = 'Produto Legal';
export const productOrderId = 1;

export const invalidProductPrice = 9.99;
export const invalidProductName = 'Pr';
export const invalidProductOrderId = '1';

export const noNameProductBody = { orderId: productOrderId, price: productPrice };
export const noPriceProductBody = { name: productName, orderId: productOrderId };
export const noOrderIdProductBody = { name: productName, price: productPrice };

export const product = { name: productName, price: productPrice, orderId: productOrderId };

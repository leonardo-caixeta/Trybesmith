import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import {
  invalidProductName,
  invalidProductOrderId,
  invalidProductPrice,
  noNameProductBody,
  noOrderIdProductBody,
  noPriceProductBody,
  product,
} from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('Erros de falta de dados', async function () {
    it('ao não receber nome, retorne um erro de requisição mal feita', async function () {
      const httpRequestBody = noNameProductBody;
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({
        message: '"name" is required',
      });
    });

    it('ao não receber preço, retorne um erro de requisição mal feita', async function () {
      const httpRequestBody = noPriceProductBody;

      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({
        message: '"price" is required',
      });
    });

    it('ao não receber número do pedido, retorne um erro de requisição mal feita', async function () {
      const httpRequestBody = noOrderIdProductBody;

      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({
        message: '"orderId" is required',
      });
    });
  });

  describe('Erros de dados inválidos', async function () {
    it('ao receber nome inválido, retorne um erro de processamento', async function () {
      const httpRequestBody = { ...product, name: invalidProductName };
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);

      expect(httpResponse.status).to.equal(422);
      expect(httpResponse.body).to.be.deep.equal({
        message: '"name" length must be at least 3 characters long',
      });
    });

    it('ao receber preço inválido, retorne um erro de processamento', async function () {
      const httpRequestBody = { ...product, price: invalidProductPrice };

      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);

      expect(httpResponse.status).to.equal(422);
      expect(httpResponse.body).to.be.deep.equal({
        message: '"price" must be a string',
      });
    });

    it('ao receber número do pedido inválido, retorne um erro de processamento', async function () {
      const httpRequestBody = { ...product, orderId: invalidProductOrderId };

      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);

      expect(httpResponse.status).to.equal(422);
      expect(httpResponse.body).to.be.deep.equal({
        message: '"orderId" must be a number',
      });
    });
  });

  describe('Sucesso', async function () {
    it('ao receber dados válidos de um produto, retorne nome, preço e id do novo produto! :)', async function () {
      const productMock = ProductModel.build(product);
      sinon.stub(ProductModel, 'create').resolves(productMock);
      const httpRequestBody = product;
      const httpResponse = await chai
        .request(app)
        .post('/products')
        .send(httpRequestBody);

      expect(httpResponse.status).to.equal(201);
      expect(httpResponse.body).to.be.deep.equal({
        id: productMock.dataValues.id,
        name: product.name,
        price: product.price,
      });
    });
  });
});

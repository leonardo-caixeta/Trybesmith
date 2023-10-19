import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import { product } from '../../mocks/product.mock';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () {
  beforeEach(function () { sinon.restore(); });
  describe('Sucesso', function () {
    it('Recebe id e retorna products', async function () {
      const productsMock = ProductModel.bulkBuild([product]);
      sinon.stub(ProductModel, 'findAll').resolves(productsMock);
      const httpResponse = await chai
        .request(app)
        .get('/products')

      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.deep.equal([productsMock[0].dataValues]);
    })
  })
});

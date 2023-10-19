import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import loginMock from '../../mocks/login.mock';
import app from '../../../src/app'

chai.use(chaiHttp);

describe('POST /login', function () {
  beforeEach(function () { sinon.restore(); });
  describe('Erros de falta de dados', async function () {
    it('ao não receber a senha, retorne um erro', async function () {
      const httpRequestBody = loginMock.noPasswordLoginBody

      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
    });

    it('ao não receber o username, retorne um erro', async function () {
      const httpRequestBody = loginMock.noUsernameLoginBody

      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: '"username" and "password" are required' });
    });
  })

  describe('Erro de dados inválidos', async function () {
    it('ao receber senha inválida, retorne um erro', async function () {
      const httpRequestBody = loginMock.invalidUsernameOrPassword

      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
    })
    it('ao receber username inválida, retorne um erro', async function () {
      const httpRequestBody = loginMock.invalidUsernameOrPassword

      const httpResponse = await chai.request(app).post('/login').send(httpRequestBody)

      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Username or password invalid' });
    })
  });
});

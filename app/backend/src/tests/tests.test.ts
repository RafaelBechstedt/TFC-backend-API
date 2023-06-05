import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamService from '../services/TeamService';
import LoginService from '../services/LoginService';
import { teamsMock, oneTeamMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Endpoint', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all teams', async () => {
    sinon.stub(TeamService, 'findAll').resolves(teamsMock);

    const res = await chai.request(app).get('/teams');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(teamsMock);
  });

  it('should return a team by id', async () => {
    sinon.stub(TeamService, 'findById').resolves(oneTeamMock);

    const res = await chai.request(app).get('/teams/8');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(oneTeamMock);
  });
});

describe('Login Endpoint', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a token when login is successful', async () => {
    const mockedUser = {
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin'
    };

    const mockedToken = 'mockedToken';

    sinon.stub(LoginService, 'login').resolves(mockedToken);

    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: mockedUser.email, password: mockedUser.password });

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ token: mockedToken });
  });

  it('should return an error message when login fails', async () => {
    const mockedUser = {
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user'
    };

    sinon.stub(LoginService, 'login').resolves(undefined);

    const res = await chai
      .request(app)
      .post('/login')
      .send({ email: mockedUser.email, password: mockedUser.password });

    expect(res).to.have.status(401);
    expect(res.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return an error message when token is not found', async () => {
    const res = await chai.request(app).get('/role');

    expect(res).to.have.status(401);
    expect(res.body).to.deep.equal({ message: 'Token not found' });
  });

  it('should return an error message when token is invalid', async () => {
    const res = await chai
      .request(app)
      .get('/role')
      .set('Authorization', 'invalidToken');

    expect(res).to.have.status(401);
    expect(res.body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('should return the role for a given email', async () => {
    const mockedRole = 'admin';

    sinon.stub(LoginService, 'getRole').resolves(mockedRole);

    const res = await chai
      .request(app)
      .get('/role')
      .set('Authorization', 'validToken');

    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal({ role: mockedRole });
  });
});

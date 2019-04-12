import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

describe('Mocha test for Account Controller', () => {
  describe('Mocha test for creating a bank account', () => {
    const createAccountUrl = '/api/v1/accounts';
    it('should create a bank account when all the parameters are given', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({
          id: 2,
          accountNumber: 2,
          email: 'Emeka@email.com',
          firstName: 'Emeka',
          lastName: 'John',
          createdOn: new Date().toLocaleString(),
          owner: 2,
          type: 'savings',
          status: 'active',
          openingBalance: 550.35
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(201);
          expect(response.body.status).to.equal(201);
          expect(response.body.data).to.be.an('object');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('accountNumber');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('createdOn');
          expect(response.body.data).to.have.property('type');
          expect(response.body.data).to.have.property('status');
          expect(response.body.data).to.have.property('openingBalance');
          console.log(response.body);
          console.log(error);
          done();
        });
    });

    it('should not create a bank account when the type is missing', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({

        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account type is required');
          done();
        });
    });

    it('should not create an account when accountNumber already exist', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({
          id: 1,
          accountNumber: 1,
          createdOn: Date.now(),
          owner: 1,
          type: 'savings',
          status: 'draft',
          openingBalance: 0.00
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.status).to.equal(400);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account already exist');
          done();
        });
    });
  });

  describe('Mocha test for PATCH request on a bank account', () => {
    const patchUrl = '/api/v1/accounts/:accountNumber';
    it('should patch a selected account number when all the parameters are given', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send({
          status: 'active' || 'dormant',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(201);
          expect(response.data).to.be.an('object');
          expect(response.body.data).to.have.property('id');
          expect(response.body.data).to.have.property('accountNumber');
          expect(response.body.data).to.have.property('firstName');
          expect(response.body.data).to.have.property('lastName');
          expect(response.body.data).to.have.property('createdOn');
          expect(response.body.data).to.have.property('openingBalance');
          expect(response.body.data).to.have.property('email');
          expect(response.body.data).to.have.property('type');
          expect(response.body.data).to.have.property('status');
          expect(response.body.data.email).to.equal('frank@email.com');
          console.log(response.body);
          done();
        });
    });

    it('should not patch the account number when accountNumber is not found', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(404);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account number not found!');
          done();
        });
    });

    it('should not patch the account number when the status is missing', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send({ })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(404);
          expect(response.body.accountNumber).to.not.equal('status');
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Account number not found!');
          done();
        });
    });
  });
});

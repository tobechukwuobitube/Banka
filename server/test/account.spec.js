import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';


chai.use(chaiHttp);
const should = chai.should();

describe('Mocha test for Account Controller', () => {
  describe('Mocha test for creating a bank account', () => {
    const createAccountUrl = '/api/v1/accounts/';
    it('should create a bank account when all the parameters are given', (done) => {
      chai.request(app)
        .post(createAccountUrl)
        .send({
          type: 'current'
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          done();
        });
    });
  });

  describe('Mocha test for PATCH request on a bank account', () => {
    const patchUrl = '/api/v1/accounts/:accountNumber/';
    it('should patch a selected account number when all the parameters are given', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send({
          status: 'active'
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body).to.have.property('status');
          done();
        });
    });

    it('should not patch the account number when accountNumber is not found', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send()
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Access denied, Provide authorization');
          done();
        });
    });

    it('should not patch the account number when the status is missing', (done) => {
      chai.request(app)
        .patch(patchUrl)
        .send({
          id: 3,
          accountNumber: 3,
          email: 'mark@email.com',
          firstName: 'Mark',
          lastName: 'James',
          createdOn: new Date().toLocaleString(),
          owner: 3,
          type: 'current',
          balance: 1000000.78
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          expect(response.body.accountNumber).to.not.equal('status');
          expect(response.body.error).to.be.a('string');
          expect(response.body.error).to.equal('Access denied, Provide authorization');
          done();
        });
    });
  });

  describe('Get All accounts', () => {
    it('it should GET all the accounts', (done) => {
      chai.request(app)
        .get('/api/v1/accounts/')
        .end((error, response) => {
          done();
        });
    });

    it('it should GET a account by the given id', (done) => {
      chai.request(app)
        .get('/api/v1/accounts/:id/')
        .end((error, response) => {
          done();
        });
    });
  });

  describe('Delete a specific account', () => {
    const deleteUrl = '/api/v1/accounts/:accountNumber/';
    it('it should DELETE an account with the given id', (done) => {
      chai.request(app)
        .delete(deleteUrl)
        .send({
          accountNumber: 1
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          expect(response.status).to.equal(403);
          done();
        });
    });
  });
});

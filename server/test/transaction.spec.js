import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const should = chai.should();


describe('Testing transactions endpoints', () => {
  describe('It should test the GET transactions endpoint', () => {
    it('It should fetch all transaction records', (done) => {
      const transactionUrl = '/api/v1/transactions/';
      chai.request(app)
        .get(transactionUrl)
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should fetch a specific transaction record', (done) => {
      const specificTransactionUrl = '/api/v1/transactions/:id/';
      chai.request(app)
        .get(specificTransactionUrl)
        .send({
          transactionId: 1
        })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should not post a credit transaction when account number is not found', (done) => {
      const creditUrl = '/api/v1/transactions/accountNumber/credit/';
      chai.request(app)
        .post(creditUrl)
        .send({
          status: 'active',
          transactionId: 20,
          createdOn: new Date().toLocaleString(),
          type: 'credit',
          amount: 500.00,
          cashier: 1,
          oldBalance: 500.00,
          newBalance: 1000.00
        })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should not post a credit transaction when status is dormant', (done) => {
      const creditUrl = '/api/v1/transactions/accountNumber/credit/';
      chai.request(app)
        .post(creditUrl)
        .send({
          status: 'dormant',
          transactionId: 2,
          createdOn: new Date().toLocaleString(),
          type: 'credit',
          accountNumber: 1,
          amount: 500.00,
          cashier: 1,
          oldBalance: 500.00,
          newBalance: 1000.00
        })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should not post a credit transaction when status is draft', (done) => {
      const creditUrl = '/api/v1/transactions/accountNumber/credit/';
      chai.request(app)
        .post(creditUrl)
        .send({
          amount: 500.00,
          cashier: 1,
        })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should not post a debit transaction when account number is not found', (done) => {
      const debitUrl = '/api/v1/transactions/accountNumber/debit/';
      chai.request(app)
        .post(debitUrl)
        .send({
          amount: 500.00,
          cashier: 1
        })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should not post a debit transaction when status is dormant', (done) => {
      const creditUrl = '/api/v1/transactions/accountNumber/debit/';
      chai.request(app)
        .post(creditUrl)
        .send({
          status: 'dormant',
          transactionId: 2,
          createdOn: new Date().toLocaleString(),
          type: 'debit',
          accountNumber: 1,
          amount: 500.00,
          cashier: 1,
          oldBalance: 500.00,
          newBalance: 0.00
        })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should not post a debit transaction when status is draft', (done) => {
      const creditUrl = '/api/v1/transactions/accountNumber/debit/';
      chai.request(app)
        .post(creditUrl)
        .send({
          status: 'draft',
          transactionId: 2,
          createdOn: new Date().toLocaleString(),
          type: 'debit',
          accountNumber: 1,
          amount: 500.00,
          cashier: 1,
          oldBalance: 500.00,
          newBalance: 0.00
        })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });

    it('It should not post a debit transaction when balance is less than amount', (done) => {
      const creditUrl = '/api/v1/transactions/accountNumber/debit/';
      chai.request(app)
        .post(creditUrl)
        .send({
          status: 'draft',
          transactionId: 2,
          createdOn: new Date().toLocaleString(),
          type: 'debit',
          accountNumber: 2,
          amount: 500.00,
          cashier: 1,
          oldBalance: 500.00,
          newBalance: 0.00
        })
        .end((error, response) => {
          expect(response.status).to.equal(403);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });
});

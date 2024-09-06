const request = require('supertest');
const app = require('../wallet'); 

describe('Wallet API', () => {
  it('should return the current wallet balance', async () => {
    const res = await request(app).get('/wallet/balance');
    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toBeDefined();
  });

  it('should deposit money into the wallet', async () => {
    const res = await request(app)
      .post('/wallet/deposit')
      .send({ amount: 100 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toBeGreaterThan(1000); 
  });

  it('should not allow depositing negative or zero amount', async () => {
    const res = await request(app)
      .post('/wallet/deposit')
      .send({ amount: -100 });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Deposit amount must be greater than zero');
  });

  it('should withdraw money from the wallet', async () => {
    const res = await request(app)
      .post('/wallet/withdraw')
      .send({ amount: 100 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.balance).toBeLessThan(1100); 
  });

  it('should not allow withdrawing more than the balance', async () => {
    const res = await request(app)
      .post('/wallet/withdraw')
      .send({ amount: 5000 }); 
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Insufficient balance');
  });
});

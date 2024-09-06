const express = require('express');
const app = express();
app.use(express.json());

let wallet = {
  balance: 1000,
};


app.get('/wallet/balance', (req, res) => {
  res.json({ balance: wallet.balance });
});


app.post('/wallet/deposit', (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ message: 'Deposit amount must be greater than zero' });
  }
  wallet.balance += amount;
  res.json({ balance: wallet.balance });
});


app.post('/wallet/withdraw', (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) {
    return res.status(400).json({ message: 'Withdrawal amount must be greater than zero' });
  }
  if (amount > wallet.balance) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }
  wallet.balance -= amount;
  res.json({ balance: wallet.balance });
});

module.exports = app;

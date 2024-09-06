const app = require('../wallet');

const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Wallet API is healthy' });
});

app.listen(port, () => {
  console.log(`Wallet API running on port ${port}`);
});

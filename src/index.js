const app = require('./wallet');

const port = process.env.PORT || 3000;



app.listen(port, () => {
  console.log(`Wallet API running on port ${port}`);
});

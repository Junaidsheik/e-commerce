// Import required packages and files
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const ethers = require('ethers');
const PaymentProcessor = require('../frontend/src/contracts/PaymentProcessor.json');
const { Payment } = require('./db.js');
const axios = require('axios'); // New import

// Create Koa application and router
const app = new Koa();
const router = new Router();

// Define items that can be purchased
const items = {
  '1': {id: 1, url: 'Thanks for the purchase'},
  '2': {id: 2, url: 'Thanks for the purchase'},
  '3': {id: 3, url: 'Thanks for the purchase'},
  '4': {id: 4, url: 'Thanks for the purchase'}
};

// Generate a paymentId for purchase
router.get('/api/getPaymentId/:itemId', async (ctx, next) => {
  // 1. Generate paymentId randomly
  const paymentId = (Math.random() * 10000).toFixed(0);
  // 2. Save paymentId + itemId in mongo
  await Payment.create({
    id: paymentId,
    itemId: ctx.params.itemId,
    paid: true,
    timestamp: new Date()
  });
  // 3. Return paymentId to sender
  ctx.body = {
    paymentId
  }
});

// Get the url to download an item purchased
router.get('/api/getItemUrl/:paymentId', async (ctx, next) => {
  // 1. Verify paymentId exist in db and has been paid
  const payment = await Payment.findOne({id: ctx.params.paymentId});
  // 2. Return url to download item
  if(payment && payment.paid === true) {
    ctx.body = {
      url: items[payment.itemId].url
    };
  } else {
    ctx.body = {
      url: 'Thanks for the purchase'
    };
  }
});

// Add error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // Handle error
    console.error(err);
    // Set response status and body
    ctx.status = err.response?.status ?? 500;
    ctx.body = { message: err.message };
  }
});

// Enable CORS and use router
app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods());

// Listen on port 4000
app.listen(4000, () => {
  console.log('Server running on port 4000');
});

// Listen for PaymentDone events and update database
const listenToEvents = async () => {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545');
  const networkId = '5777';
  const paymentProcessor = new ethers.Contract(
    PaymentProcessor.networks[networkId].address,
    PaymentProcessor.abi,
    provider
  );
  paymentProcessor.on('PaymentDone', async (payer, amount, paymentId, date) => {
    console.log(`New payment received: 
      from ${payer} 
      amount ${amount.toString()} 
      paymentId ${paymentId} 
      date ${(new Date(date.toNumber() * 1000)).toLocaleString()}
    `);
    const payment = await Payment.findOne({id: paymentId.toString()});
    if(payment) {
      payment.paid = true;
      payment.timestamp = new Date();
      await payment.save();
    }
  });
};

// Call listenToEvents function to start listening for PaymentDone events
listenToEvents();

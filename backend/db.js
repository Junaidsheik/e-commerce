const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Your mogngo DB Atlas key
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

const paymentSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  paid: Boolean,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  Payment,
};


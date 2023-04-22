const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://mkm1321:Qwerty123@cluster0.gmyiolm.mongodb.net/?retryWrites=true&w=majority',
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


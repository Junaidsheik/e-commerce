const mongoose = require('mongoose');

const uri = 'mongodb+srv://mkm1321:Qwerty123@cluster0.gmyiolm.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });

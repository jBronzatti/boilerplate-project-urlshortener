const mongoose = require('mongoose');

const Client = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
} catch (e) {
  console.log(e);
  throw e;
}};

module.exports = Client;
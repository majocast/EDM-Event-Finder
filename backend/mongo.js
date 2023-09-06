const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/EventScraper', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
})
.then((con) => console.log(`Connected to MongoDB on HOST: ${con.connection.host}`))
.catch((err) => console.log(err));

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  saved: [{
    title: String,
    date: String,
    location: String,
    photo: String,
    link: String,
  }]
})

const accounts = mongoose.model('accounts', accountSchema);

module.exports = { accounts };
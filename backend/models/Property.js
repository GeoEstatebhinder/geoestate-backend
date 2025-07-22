const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);

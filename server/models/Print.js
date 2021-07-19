const mongoose = require('mongoose');

const { Schema } = mongoose;

const printSchema = new Schema({
  size: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  }
});

const Print = mongoose.model('Print', printSchema);

module.exports = Print;
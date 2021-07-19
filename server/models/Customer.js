const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    orders: [Order.schema]
  });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
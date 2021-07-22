const { Schema } = require('mongoose');
const threadSchema = require('./Thread');
const dateFormat = require('../utils/dateFormat');

const replySchema = new Schema(
  {
    replyBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    threads: [threadSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = replySchema;

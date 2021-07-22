const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const replySchema = require('./Reply');

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
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
    }
  },
  {
    toJSON: {
      getters: true,
    }
  }
);

module.exports = commentSchema;
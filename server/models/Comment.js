const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    },
    replies: [commentSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

commentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

module.exports = commentSchema;
const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');

const chatSchema = new Schema(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    messages: [commentSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

chatSchema.virtual('messageCount').get(function() {
  return this.messages.length;
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;
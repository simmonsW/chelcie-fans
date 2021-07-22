const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const threadSchema = new Schema(
    {
        messages: [{
            message:{ type: String},
            type:{ type: String}
        }],
        parent_id:String
    }
  );
  
  module.exports = threadSchema;

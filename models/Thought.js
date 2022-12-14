const { Schema, model } = require('mongoose');
const userSchema = require('./User');
// const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timeCreated => dateFormat(timeCreated) 
        },
    },
    {
        toJSON: {
          getters: true,
          virtuals: true,
        },
        id: false
      }
  );
  
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: timeCreated => dateFormat(timeCreated)
        },

        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
  );

  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  
  const Thought = model('Thought', thoughtSchema);

  module.exports = Thought;

  
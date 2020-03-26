const mongoose = require('mongoose');

const BalanceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  code: {
    type: String
  },
  bank: {
    type: String
  },
  account: {
    type: String
  },
  type: {
    type: String
  },
  status: {
    type: String,
    default: 'not paid'
  },
  period: {
    type: Date
  },
  due: {
    type: Number
  },
  outstanding: {
    type: Number
  },
  minimum: {
    type: Number
  },
  available: {
    type: Number
  },
  rewards: {
    type: Number
  },
  comments: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('balance', BalanceSchema);

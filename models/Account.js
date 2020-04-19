const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  code: {
    type: String
  },
  country: {
    type: String
  },
  country_code: {
    type: String
  },
  bank: {
    type: String
  },
  type: {
    type: String
  },
  name: {
    type: String
  },
  active: {
    type: Boolean
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

module.exports = mongoose.model('account', AccountSchema);

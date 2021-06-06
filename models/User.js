const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  first: {
    type: String,
    trim: true
  },
  last: {
    type: String,
    trim: true
  },
  netid: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    default: 0
  },
  registered: {
    type: Array,
    default: []
  },
  attended: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  username: {
    type: String
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
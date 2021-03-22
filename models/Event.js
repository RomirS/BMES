const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  year: {
    type: Number,
    trim: true,
    required: true
  },
  months: {
    "01": {
      type: Array
    },
    "02": {
      type: Array
    },
    "03": {
      type: Array
    },
    "04": {
      type: Array
    },
    "05": {
      type: Array
    },
    "06": {
      type: Array
    },
    "07": {
      type: Array
    },
    "08": {
      type: Array
    },
    "09": {
      type: Array
    },
    "10": {
      type: Array
    },
    "11": {
      type: Array
    },
    "12": {
      type: Array
    }
  },
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
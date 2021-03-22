const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventFrame = new Schema({
    eventName: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true
    },
    registrees: {
        type: Array,
        default: []
    }
});

const EventFrame = mongoose.model('EventFrame', eventFrame);

module.exports = EventFrame;
const router = require('express').Router();

let Event = require('../../models/Event');

router.get('/', (_, res) => {
    Event.find().sort({ startTime: 1 })
    .then(events => res.json(events))
    .catch((_) => res.status(404).json('No events found'));
});

router.post('/', (req, res) => {
    const { eventName, description, startTime, endTime } = req.body;

    if(!eventName || !description || !startTime || !endTime) return res.status(400).json('Please enter all fields');

    const newEvent = new Event({
        eventName,
        description,
        startTime,
        endTime
    });

    newEvent.save().then(event => {
        res.json(event);
    });
});

module.exports = router;
const router = require('express').Router();

const Event = require('../../models/Event');
const User = require('../../models/User');

router.get('/', (_, res) => {
    Event.find().sort({ year: 1 }).select('year months')
    .then(events => {
        let modEvents = {};
        for (const eventDoc of events) {
            const year = eventDoc.year;
            modEvents[year] = eventDoc.months;
        }
        res.json(modEvents);
    })
    .catch((_) => res.status(404).json('No events found'));
});

router.get('/:year', (req, res) => {
    const year = req.params.year;
    Event.findOne({ year }).select('year months')
    .then(events => {
        if (!events) res.json('No events found');
        return res.json(events)
    }).catch((_) => res.status(404).json('No events found'));
});

router.get('/:year/:monthNo', (req, res) => {
    const year = req.params.year;
    const monthNo = req.params.monthNo;
    Event.findOne({ year })
    .then(events => {
        if (!events) res.json('No events found');
        const monthEvents = events.months[monthNo];
        if (!monthEvents || monthEvents.length === 0) res.json('No events for month number: ' + monthNo);
        res.json(monthEvents);
    }).catch((_) => res.status(404).json('No events found'));
});

router.post('/', async (req, res) => {
    const { eventName, description, startTime, endTime } = req.body;

    if (!eventName || !description || !startTime || !endTime) return res.status(400).json('Please enter all fields');
    if (eventName.includes('@')) return res.status(400).json('Name cannot contain @ symbol');

    const split = startTime.split('-');
    const year = split[0];
    const month = split[1];
    const eventObj = {
        eventName,
        description,
        startTime,
        endTime
    }

    const findIndex = (eventList, event) => {
        const { startTime, eventName } = event;
        for (let i = 0; i < eventList.length; i++) {
            if (startTime === eventList[i].startTime && eventName === eventList[i].eventName) return -1;
            if (start < eventList[i].startTime) return i;
        }
        return eventList.length;
    }

    const doc = await Event.findOne({ year });
    if (!doc) {
        const months = {};
        months[month] = [eventObj];
        const event = new Event({
            year,
            months
        });
        event.save()
        return res.json(eventObj);
    } else {
        if (doc.months[month].length !== 0) {
            const eventList = doc.months[month];
            const index = findIndex(eventList, eventObj);
            if (index === -1) return res.status(400).json('Two events cannot have the same name and start time');
            let eventsInMonth = [];
            for (let i = 0; i < index; i++) {
                eventsInMonth.push(eventList[i]);
            }
            eventsInMonth.push(eventObj);
            for (let i = index; i < eventList.length; i++) {
                eventsInMonth.push(eventList[i]);
            }
            doc.months[month] = eventsInMonth;
            await doc.save();
            return res.json(eventObj);
        } else {
            doc.months[month] = [eventObj];
            await doc.save();
            return res.json(eventObj);
        }
    }
});

router.post('/register', (req, res) => {
    const { eventName, startTime, netid } = req.body;

    const date = new Date(startTime);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : `${month}`;

    Event.findOne({ year })
    .then(doc => {
        if (doc) {
            const events = doc.months[month];
            for (const event of events) {
                if (event.eventName === eventName && event.startTime === startTime) return User.findOne({ netid });
            }
        }
        return res.status(404).json('Could not find event to register user');
    }).then(async user => {
        if (user) {
            const eventid = `${eventName}@${startTime}`;
            user.events.push(eventid);
            await user.save();
            res.json({ events: user.events });
        }
        else return res.status(404).json('Could not find user');
    }).catch(e => {
        return res.status(500).json('Server error: ', e);
    })
});

module.exports = router;
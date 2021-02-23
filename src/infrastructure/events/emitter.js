const events = require('events');

class EventEmitter {
    constructor() {
        if (!EventEmitter.instance) {
            EventEmitter.instance = new events.EventEmitter()
        }
    }

    getInstance() {
        return EventEmitter.instance
    }

}

module.exports = EventEmitter

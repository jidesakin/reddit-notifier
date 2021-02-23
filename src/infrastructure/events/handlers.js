const EventEmitter = require('./emitter')
const NotificationService = require('../../app/notifications/notification.service')

const eventEmitter = new EventEmitter().getInstance()

const register = () => {
    eventEmitter.on('SendRedditNotification', NotificationService.sendNotification)
}

module.exports = { register }
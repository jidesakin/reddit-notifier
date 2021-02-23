const EventEmitter = require('./emitter')
const NotificationService = require('../../app/notifications/notification.service')

const eventEmitter = new EventEmitter().getInstance()

eventEmitter.on('SendRedditNotification', NotificationService.sendNotification)

const register = () => {
    eventEmitter.on('SendRedditNotification', NotificationService.sendNotification)
}

module.exports = { register }
const moment = require('moment-timezone');
const { User, Subreddit } = require('../../infrastructure/database')
const EventEmitter = require('../../infrastructure/events/emitter')
const eventEmitter = new EventEmitter().getInstance()

const create = async (userToCreate) => {
    try {
        const notificationAtTimeZone = moment.tz(userToCreate.timeZone).hour(8).startOf('hour');
        userToCreate.notifyAt = moment.utc(notificationAtTimeZone);

        return await User.create(userToCreate)
    } catch (error) {
        throw error
    }
}

const update = async (userId, userDto) => {
    try {
        const options = {
            where: {
                id: userId
            }
        }
        await User.update(userDto, options)
        return await User.findOne(options)
    } catch (error) {
        throw error
    }
}

const processNotifyUsers = async () => {
    console.log('Notify users process starts')
    const users = await User.findAll({ include: [{ model: Subreddit, as: 'subreddits', through: { attributes: []} }]})
    await Promise.all(users.map(async user => {
        const currentTime = moment.utc()
        const userData = user.dataValues
        const notifyAtFromNowInMinutes = moment.duration(currentTime.diff(userData.notifyAt)).asMinutes() 
        eventEmitter.emit('SendRedditNotification', userData)
        if (notifyAtFromNowInMinutes < 2 && notifyAtFromNowInMinutes > -1 && userData.isSubscribed) {
            eventEmitter.emit('SendRedditNotification', userData)
        }

        let nextNotifyAt = moment.tz(userData.timeZone).add(1, 'days').hour(8).startOf('hour')
        nextNotifyAt = moment.utc(nextNotifyAt)
        await update(userData.id, { notifyAt: nextNotifyAt})
    }))
}

module.exports =  {
    create, update, processNotifyUsers
}
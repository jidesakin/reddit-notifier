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
    await Promise.all(users.map(user => {
        const currentTime = moment.utc()
        eventEmitter.emit('SendRedditNotification', user.dataValues)

        // if (moment.duration(currentTime.diff(user.notifyAt)).asMinutes() < 5) {
        // }
    }))
}

module.exports =  {
    create, update, processNotifyUsers
}
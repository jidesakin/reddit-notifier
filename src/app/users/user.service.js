const moment = require('moment-timezone');
const { User } = require('../../infrastructure/database')

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

module.exports =  {
    create, update
}
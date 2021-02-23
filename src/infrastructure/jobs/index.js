const cron = require('node-cron');
const UserService = require('../../app/users/user.service')

const register = () => {
    cron.schedule('* * * * *', async () => {
        await UserService.processNotifyUsers()
    });
}

module.exports = { register }

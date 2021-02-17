const { User } = require('../../infrastructure/database')

const create = async (userToCreate) => {
    try {
        return await User.create(userToCreate)
    } catch (error) {
        throw error
    }
}

module.exports =  {
    create
}
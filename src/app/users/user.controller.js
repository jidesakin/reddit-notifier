const UserService = require('./user.service')

const createUser = async (request, response) => {
    try {
        const createdUser = await UserService.create(request.body)
        return response.send(createdUser)
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

module.exports = {
    createUser
}
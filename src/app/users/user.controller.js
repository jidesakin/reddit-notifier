const UserService = require('./user.service')

const createUser = async (request, response) => {
    try {
        const createdUser = await UserService.create(request.body)
        return response.status(201).send(createdUser)
    } catch (error) {
        response.status(400).send(error)
    }
}

const updateUser = async (request, response) => {
    try {
        const updatedUser = await UserService.update(request.params.userId, request.body)
        return response.send(updatedUser)
    } catch (error) {
        response.status(400).send(error)
    }
}

module.exports = {
    createUser,
    updateUser
}
const { Router } = require('express')
const UserController = require('../app/users/user.controller')

const router = Router()

router.post('/users', UserController.createUser)
router.put('/users/:userId', UserController.updateUser)

module.exports = router
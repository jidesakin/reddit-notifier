const { Router } = require('express')
const UserController = require('../app/users/user.controller')
const SubredditController = require('../app/subreddits/subreddit.controller')

const router = Router()

router.post('/users', UserController.createUser)
router.put('/users/:userId', UserController.updateUser)
router.post('/users/:userId/subreddits', SubredditController.saveSubreddits)

module.exports = router
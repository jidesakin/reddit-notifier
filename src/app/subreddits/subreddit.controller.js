const SubredditService = require('./subreddit.service')

const saveSubreddits = async (request, response) => {
    try {
        const result = await SubredditService.addSubredditsToUser(request.params.userId, request.body.subreddits)
        response.send(result)
    } catch (error) {
        console.log(error)
        response.status(400).send(error)
    }
}

module.exports = {
    saveSubreddits
}
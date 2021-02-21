const { User, Subreddit } = require('../../infrastructure/database')

const addSubredditsToUser = async (userId, subreddits) => {
    try {
        
        const user = await User.findByPk(userId)
        await Promise.all(subreddits.map(async subreddit => {
            const options = {
                where: {
                    name: subreddit
                }
            }
            const createdSubreddit = await Subreddit.findOrCreate(options);
            await user.addSubreddit(createdSubreddit[0])
        }))

        const newUser = await User.findByPk(userId, { include: [{ model: Subreddit, as: 'subreddits', through: { attributes: []} }] })
        return newUser
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = { addSubredditsToUser }
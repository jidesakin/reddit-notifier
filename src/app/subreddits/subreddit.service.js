const axios = require('axios')
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

const getTopPostsBySubreddit = async (subredditName) => {

    try {
        const result = await axios.get(`https://www.reddit.com/r/${subredditName}/top.json?limit=3&t=day`)
        const topPosts = result.data.data.children.map(item => {
            return {
                title: item.data.title,
                thumbnail: item.data.thumbnail
            } 
        }) 
        return topPosts
    } catch (error) {
        console.log(error)
        throw error
    }
    
}

const getSubredditWithTopPosts = async (subreddits) => {
    const subredditsWithPosts = await Promise.all(subreddits.map(async subreddit => {
        const subredditWithPosts = {
            title: subreddit,
            url: `https://www.reddit.com/r/${subreddit}/top/`,
        }
        subredditWithPosts.posts = await getTopPostsBySubreddit(subreddit);
        return subredditWithPosts
    }))

    return subredditsWithPosts
}

module.exports = { addSubredditsToUser, getSubredditWithTopPosts }
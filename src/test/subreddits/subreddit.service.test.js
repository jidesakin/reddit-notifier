const sinon = require('sinon')
const axios = require('axios')
const db = require('../../infrastructure/database')
const SubredditService = require('../../app/subreddits/subreddit.service')

describe('SubredditService', () => {
    afterAll(function () {
        sinon.restore();
    });

    describe('Add subreddits to User', () => {
        let findByPk, findOrCreate
        beforeAll(() => {
            findByPk = sinon.stub(db.User, 'findByPk')
            findOrCreate = sinon.stub(db.Subreddit, 'findOrCreate')
        })

        afterAll(() => {
            findByPk.restore()
            findOrCreate.restore()
        })

        test('Should add subreddits to user', async (done) => {
            findOrCreate.returns([{ name: "Tech"}])
            findByPk.returns({
                addSubreddit: () => { return [{ name: "Tech"}]}
            })
            const subreddits = ["Tech", "Memes", "Politics"] 
            await SubredditService.addSubredditsToUser(1, subreddits)
            done()
            sinon.assert(findByPk).calledWith(1)
        })
    })

    describe('Get top posts by subreddit', () => {
        let get
        beforeAll(() => {
            get = sinon.stub(axios, 'get')
        })

        afterAll(() => {
            get.restore()
        })

        test('Should return top posts', async (done) => {
            const subredditName = ["Tech"]
            get.returns({
                data: {
                    data: {
                        children: [
                            {
                                data: {
                                    title: "Tech",
                                    thumbnail: "https://link.to.thumbnail"
                                }
                            }
                        ]
                    }
                }
            })
            await SubredditService.getSubredditWithTopPosts(subredditName)
            done()
            sinon.assert(get).calledWith(`https://www.reddit.com/r/${subredditName}/top.json?limit=3&t=day`)
            
        })
    })
})
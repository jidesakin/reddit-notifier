const fs = require('fs')
const path = require('path')
const moment = require('moment-timezone');
const Handlebars = require("handlebars");
const sgMail = require('@sendgrid/mail');
const { sendgridApiKey } = require('../../config/config')
const eventEmitter = require('../../infrastructure/events/emitter')
const SubredditService = require('../subreddits/subreddit.service');

sgMail.setApiKey(sendgridApiKey);

var source = fs.readFileSync(path.join(__dirname, 'templates/reddit-newsletter.hbs'), 'utf8');


const sendNotification = async (user) => {
    const template = Handlebars.compile(source);
    const subredditNames = user.subreddits.map(item => item.dataValues.name)
    const subreddits = await SubredditService.getSubredditWithTopPosts(subredditNames)

    const htmlTemplate = template({ user,  subreddits })
    try {
        await sgMail.send({
            to: user.email,
            from: "jideowosakin@gmail.com",
            subject: "Reddit Newsletter",
            html: htmlTemplate
        })
    } catch (error) {
        console.log(error)
        if (error.response) {
            console.error(error.response.body)
        }
    }

}

module.exports = {
    sendNotification,
}
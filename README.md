# reddit-notifier
A service that sends each subscribed user a news letter containing their top posts of each of their favorite subreddits at 8am everyday.
## Requirements

- Creating and updating users
- Adding, and updating a user's favorite subreddits
- Sending out an email to each user at 8am, containing the top posts of each of their
favorite subreddits
- Turning on and off the newsletter send out for a specific user
## Running the application
- Clone this repository to you local machine with `git clone https://github.com/jidesakin/reddit-notifier.git`
- Install the dependencies using `npm install`.
- Ensure you have Postgress installed on you machine.
- Add a copy of the `.env` to the root directory and make sure the environment variables are set correctly.
- Run `npm start` to start the application

## Running tests

`npm test`

## Next steps
- Write more tests to cover more scenarios
- Create database migrations and disable sequelize sync
- Wire up the service with docker
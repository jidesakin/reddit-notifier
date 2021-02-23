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
- Run `npm start` from the root directory to start the application

## Endpoints

| Name | Method | Url | Sample Payload |
|------|--------|-----|----------------|
| Create user | POST | `/users` | <pre lang="json"> {"firstName": "John", "lastName": "Doe", "timeZone": "Europe/Berlin", "isSubscribed": true} </pre>  |
|Update user | PUT | `/users` | <pre lang="json"> {"firstName": "John", "lastName": "Doe", "timeZone": "Europe/Berlin", "isSubscribed": true} </pre> |
| Add subreddits to user| POST | `/users/{id}/subreddits` | <pre lang="json"> {"subreddits": ["Tech", "Politics", "Memes"]} </pre> |
## Running tests

- Run `npm test` from the root directory

## Next steps
- Write more tests to cover more scenarios
- Create database migrations and disable sequelize sync
- Wire up the service with docker
- Write OpenAPI spec for the endpoints
- Improve logging
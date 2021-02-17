const express = require('express')
const bodyParser = require('body-parser')
const db = require('./src/infrastructure/database')

const app = express()
const port = 3000


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
db.sequelize.sync()

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`Reddit Notifier App running on  port ${port}.`)
})

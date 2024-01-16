const express = require('express')
const app = express()

const { getTopics } = require('./controllers/topics.controllers')
const { getApiJSON } = require('./controllers/getApiLibrary.controllers')

app.get('/api/topics', getTopics)
app.get('/api', getApiJSON)



module.exports = app
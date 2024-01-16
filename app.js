const express = require('express')
const app = express()

const { getTopics } = require('./controllers/topics.controllers')
const { getApiJSON } = require('./controllers/getApiLibrary.controllers')
const { getArticle } = require('./controllers/getArticles.controllers')


app.get('/api/topics', getTopics)
app.get('/api', getApiJSON)
app.get('/api/articles/:article_id', getArticle)


app.use((err, req, res, next) => {
   
    // console.log(err, '1st err middleware')

    if (err.code === '42703' || err.code === '42601' || err.code === '22P02') { 
    res.status(400).send({message: 'Invalid request'})
    }
    else if
    (err.status === 404) {
    res.status(err.status).send({message: err.message})
    }
    else {
        next(err)
        }
})

app.use((err, req, res, next) => {
    // console.log(err, 'err final middleware')

    res.status(500).send({ message: 'Internal server error' })
})

module.exports = app
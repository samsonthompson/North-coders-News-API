const express = require('express')
const app = express()

const { getTopics } = require('./controllers/topics.controllers')
const { getApiJSON } = require('./controllers/getApiLibrary.controllers')
const { getArticleById } = require('./controllers/getArticlesById.controllers')
const { getArticles } = require('./controllers/getArticles.controllers')
const { getComments } = require('./controllers/getComments.controllers')

app.get('/api/topics', getTopics)
app.get('/api', getApiJSON)
app.get('/api/article/:article_id', getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getComments)

app.use((err, req, res, next) => {

    // console.log(err, 'manual reject errors middleware')

    if (err.status && err.message)

    res.status(err.status).send({ message: err.message })
})

app.use((err, req, res, next) => {
   
    // console.log(err, 'primary error middleware')

    if (err.code === '42703' || err.code === '42601' || err.code === '22P02') { 
    res.status(400).send({message: 'Invalid request'})
    }
    else {
        next(err)
        }
    })

app.use((err, req, res, next) => {
    // console.log(err, 'edgecase error middleware')

    res.status(500).send({ message: 'Internal server error' })
})

module.exports = app
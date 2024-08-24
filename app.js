const express = require('express')
const CORS = require('cors')


const { getTopics } = require('./controllers/topics.controllers')
const { getApiJSON } = require('./controllers/getApiLibrary.controllers')
const { getArticleById } = require('./controllers/getArticlesById.controllers')
const { getArticles } = require('./controllers/getArticles.controllers')
const { getComments } = require('./controllers/getComments.controllers')
const { postComment } = require('./controllers/postComment.controller')
const patchArticleById = require('./controllers/patchArticlesById.controllers')
const { deleteComment } = require('./controllers/deleteComment.controllers')

const app = express()
app.use(CORS())
app.use(express.json());

app.get('/api/topics', getTopics)
app.get('/api', getApiJSON)
app.get('/api/article/:article_id', getArticleById)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getComments)
app.post('/api/articles/:article_id/comments', postComment)
app.patch('/api/articles/:article_id', patchArticleById)
app.delete('/api/comments/:comment_id', deleteComment)

app.use((err, req, res, next) => {
    if (err.status && err.message) {  
        res.status(err.status).send({ message: err.message });
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    if (err.code === '42703' || err.code === '42601' || err.code === '22P02' || err.code === '23502') 
    { 
    res.status(400).send({message: 'Invalid request'})
    }
    else {
        next(err)
        }
    })

app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Internal server error' })
})


module.exports = { app }
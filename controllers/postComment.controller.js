const { insertComment } = require('../models/postComment.model')

exports.postComment = (req, res, next) => {

    const id = req.params.article_id
    const author = req.body.username
    const body = req.body.body
    
insertComment(id, author, body)
    .then((data) => {
        res.status(201).send(data.rows)
    })
    .catch((err) => {
        next(err)
    })
}
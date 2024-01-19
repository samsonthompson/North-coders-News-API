const { insertComment } = require('../models/postComment.model')

exports.postComment = (req, res, next) => {

    const { article_id }= req.params
    const { username, body } = req.body
    
insertComment(article_id, username, body)
    .then((data) => {
        res.status(201).send(data.rows)
    })
    .catch((err) => {
        next(err)
    })
}
const { deleteCommentById } = require('../models/deleteComment.models')

exports.deleteComment = (req, res, next) => {
    const { comment_id : id } = req.params
    
    deleteCommentById(id)
    .then(() => {
        res.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}
const { deleteCommentById } = require('../models/deleteComment.models')

exports.deleteComment = (req, res, next) => {
    const { comment_id : id } = req.params
    console.log(id, '<<< i am the id');
    
    deleteCommentById(id)
    .then(() => {
        res.status(204).send()
    })
    .catch((err) => {
        next(err)
    })
}
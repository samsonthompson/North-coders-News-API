const { fetchComments } = require('../models/getComments.models')

exports.getComments = (req, res, next) => {
    id = req.params.article_id
    fetchComments(id)
    .then((data) => {
        res.status(200).send({comments: data})
    })
    .catch((err)=>{
        next(err)
    })
}
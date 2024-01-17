const { fetchArticles } = require('../models/getArticles.models')

exports.getArticles = (req, res, next) => {
    fetchArticles()
    .then((data) => {
        res.status(200).send({articles : data})
    })
    .catch((err) => {
        next(err)
    })
}
const { fetchArticleById } = require('../models/getArticlesById.models')

exports.getArticleById = (req, res, next) => {
    const id = req.params.article_id
    fetchArticleById(id)
        .then((data) => {
            res.status(200).send({article : data})
            })
        .catch((err) => {
            next(err);
        })
    }


const { fetchArticlesById } = require('../models/getArticles.models')

exports.getArticle = (req, res, next) => {
    const id = req.params.article_id
    fetchArticlesById(id)
        .then((data) => {
            res.status(200).send({article : data})
            })
        .catch((err) => {
            next(err);
        })
    }


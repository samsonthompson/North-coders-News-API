const { fetchArticlesById } = require('../models/getArticles.models')

exports.getArticles = (req, res, next) => {

    const article_id = req.params.article_id
    // console.log(article_id)
    
    fetchArticlesById(article_id)
        .then((article) => {
            if (article.length === 0) {
               return Promise.reject({status: 404, message: 'Article not found'})
            } else {
                res.status(200).send({article : data})
            }
        })
        .catch((err) => {
            next(err);
        })
    }


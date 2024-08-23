const { fetchArticles } = require('../models/getArticles.models')

exports.getArticles = (req, res, next) => {
    const { topic, order = 'ASC' } = req.query;
    
    fetchArticles(topic, order)
      .then((data) => {
        res.status(200).send({ articles: data });
      })
      .catch((err) => {
        next(err);
      });
  };
const { fetchArticles } = require('../models/getArticles.models');

exports.getArticles = async (req, res, next) => {
  const { topic, sort_by = 'created_at', order = 'DESC' } = req.query;
  try {
    const articles = await fetchArticles(topic, sort_by, order);
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

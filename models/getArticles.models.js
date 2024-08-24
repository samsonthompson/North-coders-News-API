const db = require('../db/connection');

exports.fetchArticles = async (topic, sort_by = "created_at", order = "DESC") => {
  const queryValues = [];
  const validSortingQueries = ["title", "author", "created_at", "comment_count", "topic"];
  const validOrders = ['ASC', 'DESC'];

  if (!validSortingQueries.includes(sort_by) || !validOrders.includes(order.toUpperCase())) {
    return Promise.reject({
      status: 400,
      message: "Invalid sorting criteria. Please use a valid column name and ASC or DESC order."
    });
  }

  let queryString = `
      SELECT 
      articles.article_id,
      articles.title, 
      articles.topic,
      articles.author,
      articles.created_at, 
      articles.votes,
      articles.article_img_url, 
      CAST(COUNT(comments.comment_id) AS INT) AS comment_count
      FROM articles 
      LEFT JOIN comments ON articles.article_id = comments.article_id
  `;

  if (topic) {
    queryString += ` WHERE articles.topic = $1`;
    queryValues.push(topic);
  }

  queryString += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;

  try {
    const { rows } = await db.query(queryString, queryValues);

    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "No articles found" });
    }

    return rows;
  } catch (err) {
    throw err;
  }
};

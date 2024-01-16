const db = require('../db/connection')

exports.fetchArticlesById = (article_id) => {
    return db.query(
        `SELECT * FROM articles
        WHERE article_id = ${article_id}`)
    .then((article) => {
        // console.log(result.rows, '<<< in the model return');
        return article.rows
    })
}
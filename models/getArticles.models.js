const db = require('../db/connection')
    
exports.fetchArticles = (topic, order = 'ASC') => {
    const queryValues = [];
    
    if (!validSortingQueries.includes(order_by) || !order.match(/^(DESC|ASC)$/i)) {
        return Promise.reject({
            status: 400,
            msg: "Invalid sorting criteria. Please use a valid column name and ASC or DESC order.",
        });
    }

    let queryString = `
        SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        CAST(COUNT(comments.article_id) AS INT) AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
    `;

    if (topic) {
        queryString += ` WHERE articles.topic = $1`;
        queryValues.push(topic);
    }

    queryString += `
        GROUP BY articles.article_id
        ORDER BY topic ${order};
    `;

    return db.query(queryString, queryValues).then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "No articles found" });
        }
        return rows;
    });
};
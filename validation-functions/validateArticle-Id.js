const db = require('../db/connection')

exports.validateArticleId = (id) => {
    return db.query(
        `SELECT * FROM articles 
         WHERE article_id = $1`, [id]
         )
         .then(({rows}) => {
            if(!rows.length){
                return Promise.reject({status: 404, message: `Article ID doesn't currently exist`})
            }
         })
}
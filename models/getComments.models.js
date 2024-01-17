const db = require('../db/connection')
const { validateArticleId } = require('../validation-functions/validateArticle-Id')

exports.fetchComments = async (id) => {

    try {

        const validArticleId = await validateArticleId(id)
        const commentsResult = await db.query(`SELECT * FROM comments
                                               WHERE article_id = $1 
                                               ORDER BY created_at DESC`, [id])
                                               

        await Promise.all([validArticleId, commentsResult])

        if (commentsResult.rows.length === 0) {
            return Promise.reject({status: 404, message: 'No comments found for this article'})
        }

        return commentsResult.rows

       }

    catch(err) {
        throw err
       }
}
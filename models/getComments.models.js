const db = require('../db/connection')
const { validateArticleId } = require('../validation-functions/validateArticle-Id')

exports.fetchComments = async (id) => {

    try {

        const validArticleId = await validateArticleId(id)
        const commentsResult = await db.query(`SELECT * FROM comments
                                               WHERE article_id = $1 
                                               ORDER BY created_at DESC`, [id])
                                               

        await Promise.all([validArticleId, commentsResult])
        return commentsResult.rows

       }

    catch(err) {
        throw err
       }
}
const db = require('../db/connection')
const { validateArticleId } = require('../validation-functions/validateArticle-Id')

async function updateVoteByArticleId (article_id, inc_votes) {
   try {
    
   await validateArticleId(article_id)
    
   return db.query(
    `
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *`, 
    [inc_votes, article_id])

    .then((article)=>{
        return article
        })
    }
    catch(err){
        throw err
        }
    }


    module.exports = updateVoteByArticleId
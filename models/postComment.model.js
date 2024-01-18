const db = require('../db/connection')
const { validateArticleId } = require('../validation-functions/validateArticle-Id')
const { validateUser } = require('../validation-functions/validateUser')
const format = require('pg-format')

exports.insertComment = async (id, author, body) => {
  try {

  const isUser = await validateUser(author)
  const hasID = await validateArticleId(id)

  await Promise.all([isUser, hasID])

  if(!body){
    return Promise.reject({status: 400, message: `Invalid request, no body key found`})
  }

      const query = format(
        `INSERT INTO comments
        (body, article_id, author)
        VALUES
        (%L, %L, %L)
        RETURNING *`, body, id, author)

       const comment = await db.query(query)
           return comment
       }
      
    catch (err) {
      throw(err)
    }

    }

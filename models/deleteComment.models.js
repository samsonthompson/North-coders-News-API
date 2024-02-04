const db = require('../db/connection')

exports.deleteCommentById = async (id) => {

console.log('i am here')
    try{

    const checkCommentId = await db.query(
        `SELECT * FROM comments
        WHERE comment_id = $1
        RETURNING *`, [id]
    )
    if (checkCommentId.rows.length === 0){
        Promise.reject({status: 404, message: `Comment ID doesn't exist`})
    }

    else {
        await db.query(
        `DELETE from comments
        WHERE comment_id = $1
        RETURNING *`, [id])
    }
}
 catch(err) {
        console.log(err);
    throw err
    }     
    
}
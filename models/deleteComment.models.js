const db = require('../db/connection')
const { checkCommentExists } = require('../validation-functions/checkCommentexists')


exports.deleteCommentById = async (id) => {
         const checkData = await checkCommentExists(id);
        if (checkData.length !== 0) {
          return db
            .query(`DELETE FROM comments WHERE comment_id=$1`, [id])
            .then(({ rows }) => {
              return rows;
            });
        } else {
          return Promise.reject({ status: 404, msg: "Not found" });
        }
      }

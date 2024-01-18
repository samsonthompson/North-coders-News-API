const db = require('../db/connection')

exports.validateUser = (username) => {
 
        return db.query(
            `SELECT * FROM users
             WHERE username = $1`, [username]
             )
             .then(({rows}) => {
                if(!rows.length){
                    return Promise.reject({status: 404, message: `Username doesn't currently exist`})
                }
             })
    }

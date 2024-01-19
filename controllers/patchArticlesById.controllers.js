
const updateVoteByArticleId = require('../models/patch.models')

function patchArticleById(req, res, next){

    const {article_id} = req.params
    const {inc_votes} = req.body
    
    updateVoteByArticleId(article_id, inc_votes)
    .then((data) => {
        res.status(200).send({article : data.rows})
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = patchArticleById



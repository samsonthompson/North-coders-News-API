const { fetchApiJSON } = require('../models/apiLibrary.models')

const getApiJSON = (req, res, next) => {
    fetchApiJSON()
    .then((data) => {
        res.status(200).send(data) 
    })
    .catch((err) => {
        next(err)
        /* i can only think that the err might be a 500 err not able to read
         the json or a 404 if that typed in a weird misspelt /api */
    })
}

module.exports = { getApiJSON }
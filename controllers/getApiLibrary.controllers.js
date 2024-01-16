const { fetchApiJSON } = require('../models/apiLibrary.models')

const getApiJSON = (req, res, next) => {
    fetchApiJSON()
    .then((data) => {
        res.status(200).send({endpoints : data}) 
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getApiJSON }
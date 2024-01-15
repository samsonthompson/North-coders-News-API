const { fetchTopics }  = require('../models/topics.models')

exports.getTopics = (req, res) => {
    fetchTopics()
    .then((topics) => {
        // console.log(topics, '<<< in the controller');
        res.status(200).send((topics))
    })
    .catch((err) => {
        console.log(err);
    })
}
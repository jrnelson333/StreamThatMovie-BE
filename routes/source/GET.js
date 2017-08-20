// const Rating = require('../../models/Rating');
const sourceUtil = require('../util');

var getSource = function getSource(req, res, next) {

    // if (!req.user) { return res.status(403).send(); }
    sourceUtil.getNetflix(req.query).then(function (resp) {
        if (!resp) {
            return res.status(404).send();
        } else {
            return res.status(200).send(resp);
        }
    })

}

module.exports = getSource;
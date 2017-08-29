const Source = require('../../models/Source');
const returnMovieDetails = require('../common').returnMovieDetails

var getSource = function getSource(req, res, next) {
    let limit = req.query.limit || 100;
    const callback = function callback(err, obj) {
        if (err) {
            return next(err);
        } else if (obj && obj.length) {
            let body = { results: obj }
            return returnMovieDetails(body, req, res)
        } else {
            res.status(404).send();
        }
    }

    Source.find({}, callback).sort({'popularity': -1}).limit(limit).lean()

}

module.exports = getSource;
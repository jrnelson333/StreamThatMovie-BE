const Favorite = require('../../models/Favorite');
const returnMovieDetails = require('../common').returnMovieDetails

var getFavoriteList = function getFavoriteList(req, res, next) {

    if (!req.user) { return res.status(403).send(); }

    let query = { userId: req.user._id }

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

    Favorite.find(query, callback).lean()

}

module.exports = getFavoriteList;
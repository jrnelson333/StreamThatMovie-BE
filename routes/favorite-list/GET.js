const Favorite = require('../../models/Favorite');
const util = require('../util');

var getFavoriteList = function getFavoriteList(req, res, next) {

    if (!req.user) { return res.status(403).send(); }

    let query = { userId: req.user._id }

    const callback = function callback(err, obj) {
        if (err) {
            return next(err);
        } else if (obj && obj.length) {
            let promises = [];
            obj.forEach(function (movie, i) {
                promises.push(util.getMovieInfo(movie.movieId))
            })
            Promise.all(promises).then(
                function (resp) {
                    res.status(200).send(resp);
                },
                function (err) {
                    res.send(500).send({ message: 'Error retreiving movie data' })
                })

        } else {
            res.status(404).send();
        }
    }

    Favorite.find(query, callback)

}

module.exports = getFavoriteList;
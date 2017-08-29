const Favorite = require('../../models/Favorite');

var favoriteMovie = function favoriteMovie(req, res, next) {

    if (!req.user) { return res.status(403).send(); }

    const newFavorite = Object.assign(req.body, { userId: req.user._id })

    const favorite = new Favorite(newFavorite)

    const callback = function callback(err, obj) {
        if (err) { return res.status(400).send({error: 'Error saving record.'}) }
        const toReturn = obj || {};
        res.status(201).send(toReturn);
    }

    favorite.save(callback);

}

module.exports = favoriteMovie;
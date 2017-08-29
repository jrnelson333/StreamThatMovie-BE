const Rating = require('../../models/Rating');

var rateMovie = function rateMovie(req, res, next) {

    if (!req.user) { return res.status(403).send(); }

    const rating = {
        rating: req.body.rating
    }

    const query = {
        id: req.params.id,
        userId: req.user._id
    }

    const options = {
        new: true,
        upsert: true
    }

    const callback = function callback(err, obj) {
        if (err) { return res.status(400).send({error: 'Error saving record.'}) }
        const toReturn = obj || {};
        res.status(200).send(toReturn);
    }

    Rating.findOneAndUpdate(query, rating, options, callback)

}

module.exports = rateMovie;
const Rating = require('../../models/Rating');

var getRating = function getRating(req, res, next) {

    if (!req.user) { return res.status(403).send(); }

    const query = {
        id: req.params.id,
        userId: req.user._id
    }

    const callback = function callback(err, obj) {
        if (err) { 
            return next(err);
        } else if (obj) {
            res.status(200).send(obj);
        } else {
            res.status(404).send();
        }
    }

    Rating.findOne(query, callback)

}

module.exports = getRating;
const Rating = require('../../models/Rating');

var getRating = function getRating(req, res, next) {

    const query = {
        id: parseInt(req.params.id)
    }

    const callback = function callback(err, obj) {
        if (err) { 
            return next(err);
        } else if (obj.length) {
            res.status(200).send(obj[0]);
        } else {
            res.status(404).send();
        }
    }

    Rating.aggregate([
        { $match: query },
        { $group: { 
                _id: "$id",
                rating: { $avg: "$rating" }
            }
        }
    ], callback)

}

module.exports = getRating;
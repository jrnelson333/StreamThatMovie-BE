const Favorite = require('../models/Favorite');
const Rating = require('../models/Rating');
const Source = require('../models/Source');


var getFavorite = function getFavorite(query) {
    return Favorite.findOne(query)
}

var getRating = function getRating(query) {
    return Rating.findOne(query)
}

var getAvgRating = function getAvgRating(query) {

    return Rating.aggregate([
        { $match: query },
        {
            $group: {
                _id: "$id",
                rating: { $avg: "$rating" }
            }
        }
    ])

}

var getSource = function getSource(query) {
    return Source.findOne(query)
}
var returnMovieDetails = function returnMovieDetails(body, req, res) {
    let promises = [];
    
    body.results.forEach(function (result, i) {
        let query = {};
        if (req.user) {
            query = { id: result.id, userId: req.user._id }
            promises.push(getFavorite(query).then(resp => {
                resp ? result.favorite = true : null
            }))
            promises.push(getRating(query).then(resp => {
                resp ? result.userRating = resp.rating : null
            }))
        }
        query = { id: result.id }
        promises.push(getAvgRating(query).then(resp => {
            resp && resp.length ? result.avgRating = resp[0].rating : null
        }))
        promises.push(getSource(query).then(resp => {
            resp ? result.source = resp : null
        }))
    })

    Promise.all(promises).then(function () {
        return res.status(200).send(body);
    }).catch(function (err) {
        return res.status(200).send(body);
    })

}

module.exports = {
    getFavorite,
    getRating,
    getAvgRating,
    getSource,
    returnMovieDetails
};
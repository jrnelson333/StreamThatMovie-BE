const requestPromise = require('request-promise');
const returnMovieDetails = require('../common').returnMovieDetails
const dotenv = require('dotenv');
const key = process.env.TMDB_KEY;
const currentYear = (new Date()).getFullYear();
const baseUrl = 'https://api.themoviedb.org/3/';
const baseUrlDiscover = baseUrl + 'discover/movie?api_key=' + key;
const categoryUrls = {};
categoryUrls['popular'] = baseUrlDiscover + '&sort_by=popularity.desc&vote_count.gte=100'
categoryUrls['g-rated'] = baseUrlDiscover + '&certification_country=US&certification.lte=G&sort_by=popularity.desc&vote_count.gte=100';
categoryUrls['comedy'] = baseUrlDiscover + '&with_genres=35&sort_by=popularity.desc&vote_count.gte=100';
categoryUrls['top-rated'] = baseUrlDiscover + '&sort_by=vote_average.desc&vote_count.gte=1000';
categoryUrls['current'] = baseUrlDiscover + '&sort_by=vote_average.desc&vote_count.gte=100&primary_release_year=' + currentYear;
categoryUrls['sci-fi'] = baseUrlDiscover + '&with_genres=878&sort_by=vote_average.desc&vote_count.gte=1000';

var getCategory = function getCategory(req, res, next) {

    const category = req.params.category
    const url = categoryUrls[category];

    return requestPromise({
        uri: url,
        method: 'GET'
    }).then(function (body) {
        body = JSON.parse(body);        
        returnMovieDetails(body, req, res)
    }).catch(function (err) {
        console.log(err)
        return res.status(400).send({ message: 'There was an error processing the request' })
    })

}

module.exports = getCategory;
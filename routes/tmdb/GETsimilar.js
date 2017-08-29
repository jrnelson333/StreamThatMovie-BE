const requestPromise = require('request-promise');
const returnMovieDetails = require('../common').returnMovieDetails
const dotenv = require('dotenv');
const key = process.env.TMDB_KEY;
const baseUrl = 'https://api.themoviedb.org/3/';

var getSimilar = function getSimilar(req, res, next) {

    const id = req.params.id
    const url = baseUrl + 'movie/' + id + '/similar?api_key=' + key;
    console.log(url)
    
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

module.exports = getSimilar;
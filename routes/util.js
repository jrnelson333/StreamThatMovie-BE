
const dotenv = require('dotenv');
const https = require('https');
var requestPromise = require('request-promise');

dotenv.load({ path: '.env' });
const googleApiBaseUrl = 'https://www.googleapis.com/customsearch/v1?'
const tmdbBaseUrl = 'https://api.themoviedb.org/3/';

getMovieInfo = function getMovieInfo(id) {
    
    return requestPromise({
        uri: `${tmdbBaseUrl}movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`,
        method: "GET"
    }).then(function(body) {
        body = JSON.parse(body);
        return body;
    })
}

getNetflix = function getNetflix(query) {
    query.year = query.year || '';
    return requestPromise({
        uri: `${googleApiBaseUrl}key=${process.env.GOOGLE_KEY}&cx=${process.env.NETFLIX_CX}&q=${query.title}${query.year}`,
        method: "GET"
    }).then(function (body) {
        body = JSON.parse(body);
        if (body.items && body.items.length) {
            for (var i = 0; i < body.items.length; i++) {
                if (body.items[i].title && body.items[i].title.toLowerCase() === `${query.title.toLowerCase()} | netflix`) {
                    return { title: body.items[i].title.replace(' | Netflix', ''), link: body.items[i].link }
                }
            }
        } else {
            return null
        }
    })
}

let exp = {
    getNetflix: getNetflix,
    getMovieInfo: getMovieInfo
}

module.exports = exp;
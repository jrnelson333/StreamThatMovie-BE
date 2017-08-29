
const dotenv = require('dotenv');
const https = require('https');
const requestPromise = require('request-promise');
const Source = require('../models/Source')

dotenv.load({ path: '.env' });
const googleApiBaseUrl = 'https://www.googleapis.com/customsearch/v1?'
const tmdbBaseUrl = 'https://api.themoviedb.org/3/';

getMovieInfoById = function getMovieInfo(id) {
    return requestPromise({
        uri: `${tmdbBaseUrl}movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`,
        method: "GET"
    }).then(function (body) {
        body = JSON.parse(body);
        return body;
    })
}

getMovieInfoByName = function getMovieInfoByName(name) {
    return requestPromise({
        uri: `${tmdbBaseUrl}search/movie?api_key=${process.env.TMDB_KEY}&query=${name}`,
        method: "GET"
    }).then(function (body) {
        body = JSON.parse(body);
        for (var i = 0; i < body.results.length; i++) {
            if (body.results[i].title == name) {
                return { 
                    id: body.results[i].id, 
                    title: body.results[i].title,
                    poster_path: body.results[i].poster_path,
                    genre_ids: body.results[i].genre_ids,
                    backdrop_path: body.results[i].backdrop_path,
                    overview: body.results[i].overview,
                    release_date: body.results[i].release_date,
                    popularity: body.results[i].popularity,
                    vote_average: body.results[i].vote_average,
                    vote_count: body.results[i].vote_count                 
                };
            }
        }
        return null;
    }).catch(function (e) {
        // console.log(e.error)
    })
}

getNetflixByIndex = function getNetflixByIndex(index, query = '%27%27') {
    return requestPromise({
        uri: `${googleApiBaseUrl}key=${process.env.GOOGLE_KEY}&cx=${process.env.NETFLIX_CX}&q=${query}&start=${index}`,
        method: "GET"
    }).then(function (body) {
        body = JSON.parse(body);
        movies = [];
        body.items.forEach(function (movie, i) {
            movies.push({ title: movie.title.replace(' | Netflix', ''), link: movie.link })
        })
        return movies;
    }).catch(function (e) {
        // console.log(e.error)
    })
}

saveNetflixByIndex = function saveNetflixByIndex(index, query = '%27%27') {
    const callback = function (data) {
        return data;
    }
    let saveAllMovies = function (movies) {
        movies.forEach(function (movie, i) {
            getMovieInfoByName(movie.title).then(function (tmdbMovie) {
                if (tmdbMovie) {
                    const source = Object.assign(tmdbMovie, {
                        netflix: {
                            title: movie.title,
                            link: movie.link,
                            lastUpdated: new Date()
                        }
                    })
                    const options = {
                        new: true,
                        upsert: true
                    }
                    const query = {
                        id: tmdbMovie.id
                    }
                    Source.findOneAndUpdate(query, source, options, callback)
                }
            })
        })
    }
    getNetflixByIndex(index, query).then(saveAllMovies);
}

queryNetflix = function queryNetflix() {
    let queries = [
                    'love', 'show', 'night', 'comedy', 'life', 'day', 'man', 'little', 'girl', 'big',
                    'space', 'star', 'time', 'alien', 'world', 'planet', 'earth', 'lost', 'wild', 'romance',
                    'night', 'heart', 'story', 'woman', 'last', 'dead', 'city', 'kid', 'part', 'day', 'fire',
                    'bad', 'true', 'train', 'die', 'goes', 'treasure', 'kiss', 'one', 'year', 'make',
                    'the', 'be', 'to', 'of', 'and', 'in', 'that', 'have', 'it', 'not', 'for', 'on', 'will', 'go',
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 
                    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
                ]
    function doSetTimeout(query, j) {
        let time = j * 15000;
        setTimeout(function () {
            saveNetflixByIndex(1, query);
            saveNetflixByIndex(11, query);
            saveNetflixByIndex(21, query);
            saveNetflixByIndex(31, query);
        }, time)
    }
    queries.forEach(function (query, i) {
        doSetTimeout(query, i);
    })

}

module.exports = {
    queryNetflix
};
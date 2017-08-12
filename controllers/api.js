const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), { multiArgs: true });
const cheerio = require('cheerio');
const graph = require('fbgraph');
// const LastFmNode = require('lastfm').LastFmNode;
// const tumblr = require('tumblr.js');
const GitHub = require('github');
const Twit = require('twit');
// const stripe = require('stripe')(process.env.STRIPE_SKEY);
// const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const Linkedin = require('node-linkedin')(process.env.LINKEDIN_ID, process.env.LINKEDIN_SECRET, process.env.LINKEDIN_CALLBACK_URL);
// const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
// const paypal = require('paypal-rest-sdk');
// const lob = require('lob')(process.env.LOB_KEY);
const ig = bluebird.promisifyAll(require('instagram-node').instagram());
// const foursquare = require('node-foursquare')({
//   secrets: {
//     clientId: process.env.FOURSQUARE_ID,
//     clientSecret: process.env.FOURSQUARE_SECRET,
//     redirectUrl: process.env.FOURSQUARE_REDIRECT_URL
//   }
// });

// foursquare.Venues = bluebird.promisifyAll(foursquare.Venues);
// foursquare.Users = bluebird.promisifyAll(foursquare.Users);

/**
 * GET /api
 * List of API examples.
 */
exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook');
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, results) => {
    if (err) { return next(err); }
    res.render('api/facebook', {
      title: 'Facebook API',
      profile: results
    });
  });
};

/**
 * GET /api/github
 * GitHub API Example.
 */
exports.getGithub = (req, res, next) => {
  const github = new GitHub();
  github.repos.get({ owner: 'sahat', repo: 'hackathon-starter' }, (err, repo) => {
    if (err) { return next(err); }
    res.render('api/github', {
      title: 'GitHub API',
      repo
    });
  });
};

/**
 * GET /api/twitter
 * Twitter API example.
 */
exports.getTwitter = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'twitter');
  const T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.get('search/tweets', { q: 'nodejs since:2013-01-01', geocode: '40.71448,-74.00598,5mi', count: 10 }, (err, reply) => {
    if (err) { return next(err); }
    res.render('api/twitter', {
      title: 'Twitter API',
      tweets: reply.statuses
    });
  });
};

/**
 * GET /api/linkedin
 * LinkedIn API example.
 */
exports.getLinkedin = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'linkedin');
  const linkedin = Linkedin.init(token.accessToken);
  linkedin.people.me((err, $in) => {
    if (err) { return next(err); }
    res.render('api/linkedin', {
      title: 'LinkedIn API',
      profile: $in
    });
  });
};

/**
 * GET /api/instagram
 * Instagram API example.
 */
exports.getInstagram = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'instagram');
  ig.use({ client_id: process.env.INSTAGRAM_ID, client_secret: process.env.INSTAGRAM_SECRET });
  ig.use({ access_token: token.accessToken });
  Promise.all([
    ig.user_searchAsync('richellemead'),
    ig.userAsync('175948269'),
    ig.media_popularAsync(),
    ig.user_self_media_recentAsync()
  ])
  .then(([searchByUsername, searchByUserId, popularImages, myRecentMedia]) => {
    res.render('api/instagram', {
      title: 'Instagram API',
      usernames: searchByUsername,
      userById: searchByUserId,
      popularImages,
      myRecentMedia
    });
  })
  .catch(next);
};
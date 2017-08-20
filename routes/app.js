const path = require('path');
const passportConfig = require(path.resolve('config/passport'));
const authRoutes = require('./auth');

const passport = require('passport');


var AppModule = function AppModule(app) {
    
    // Index.html routes
    app.get('/', require('./getIndex'))
    app.get('/home', require('./getIndex'))
    app.get('/home/*', require('./getIndex'))

    // API Routes
    app.post('/api/auth/signup', authRoutes.postSignup);
    app.post('/api/auth/login', authRoutes.postLogin);
    app.get('/api/auth/logout', authRoutes.logout);
    app.get('/api/auth/delete', authRoutes.postDeleteAccount);

    app.get('/api/getUser', require('./getUser'));
    app.post('/api/movie/rating/:id', require('./rating/POST'));
    app.get('/api/movie/rating/:id', require('./rating/GET'));
    app.get('/api/movie/rating/avg/:id', require('./rating/GETaverage'));
    app.post('/api/movie/favorite/:id', require('./favorite/POST'));
    app.get('/api/movie/favorite/:id', require('./favorite/GET'));
    app.get('/api/movie/favorite', require('./favorite/GET'));
    app.delete('/api/movie/favorite/:id', require('./favorite/DELETE'));
    app.get('/api/user/favoriteList', require('./favorite-list/GET'));
    
    // app.get('/api/movie/source/', require('./source/GET'))
    

    // Social Media OAuth Routes
    app.get('/auth/instagram', passport.authenticate('instagram'));
    app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
}

module.exports = AppModule;
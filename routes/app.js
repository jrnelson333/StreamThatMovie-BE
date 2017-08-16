const path = require('path');
const passportConfig = require(path.resolve('config/passport'));
const userRoutes = require('./user');

const passport = require('passport');


var AppModule = function AppModule(app) {
    
    // Index.html routes
    app.get('/', require('./getIndex'))
    app.get('/home', require('./getIndex'))
    app.get('/home/*', require('./getIndex'))

    // API Routes
    app.get('/api/getUser', require('./getUser'));
    app.post('/api/signup', userRoutes.postSignup);
    app.post('/api/login', userRoutes.postLogin);

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
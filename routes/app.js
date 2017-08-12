var path = require('path');
const apiController = require(path.resolve('controllers/api'));
const passportConfig = require(path.resolve('config/passport'));

const passport = require('passport');


var AppModule = function AppModule(app) {
    
    // Index.html routes
    app.get('/', require('./getIndex'))
    app.get('/home', require('./getIndex'))
    app.get('/home/*', require('./getIndex'))

    // API Routes
    app.get('/getUser', require('./getUser'));

    // 
    app.get('/api', apiController.getApi);
    app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
    app.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
    app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
    app.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
    app.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);

    //
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
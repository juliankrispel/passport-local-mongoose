var passport = require('passport'),
    Account = require('./models/account');

module.exports = function (app) {
    app.get('/', ensureAuthenticated, function (req, res) {
    console.log(req.user);
        res.render('index', { user : req.user });
    });

    app.get('/register', function(req, res) {
        res.render('register', { });
    });

    app.post('/register', function(req, res) {
    console.log(req.body);
        Account.register(new Account({ username : req.body.username, permissions: [req.body.permission] }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', { account : account });
            }

            res.redirect('/');
        });
    });

    app.get('/login', function(req, res) {
        res.render('login', { user : req.user });
    });

    app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function(req, res) {
        res.redirect('/');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

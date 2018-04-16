var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

// GET profile
router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('user/profile');
});
// GET logout
router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('signin');
});


// NOT loggedin routes
router.use('/', notLoggedIn, function (req, res, next) {
    next();
})
// GET signup page
router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        title: 'Sign Up',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
// POST signup page
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));
// GET signin page
router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {
        title: 'Sign-in',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
// POST signin page
router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated())
        return next();
    res.redirect('/');
}
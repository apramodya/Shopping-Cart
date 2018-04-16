var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);

// GET home page
router.get('/', function (req, res, next) {
    var products = Product.find(function (err, docs) {
        res.render('shop/index', {
            title: 'Shopping Cart',
            products: docs
        });
    });
});

// GET signup page
router.get('/user/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        title: 'Sign Up',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
// POST signup page
router.post('/user/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));
// GET profile
router.get('/user/profile', function (req, res, next) {
    res.render('user/profile');
});

// GET signin page
router.get('/user/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {
        title: 'Sign-in',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

// POST signin page
router.post('/user/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

module.exports = router;

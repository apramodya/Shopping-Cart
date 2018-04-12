var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');

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
    res.render('user/signup', {
        csrfToken: req.csrfToken()
    });
});
// POST signup page
router.post('/user/signup', function (req, res, next) {
    res.redirect('/');
});


module.exports = router;

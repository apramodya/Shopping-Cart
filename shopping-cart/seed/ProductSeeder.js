var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping');


var products = [
    new Product({
        imagePath: 'https://zeerk.com/mod/uploads/2017/03/book-1024x793.jpg',
        title: 'Book',
        description: 'awesome book to read',
        price: 10
    }),
    new Product({
        imagePath: 'https://zeerk.com/mod/uploads/2017/03/book-1024x793.jpg',
        title: 'Book',
        description: 'awesome book to read',
        price: 10
    }),
    new Product({
        imagePath: 'https://zeerk.com/mod/uploads/2017/03/book-1024x793.jpg',
        title: 'Book',
        description: 'awesome book to read',
        price: 10
    }),
    new Product({
        imagePath: 'https://zeerk.com/mod/uploads/2017/03/book-1024x793.jpg',
        title: 'Book',
        description: 'awesome book to read',
        price: 10
    }),
    new Product({
        imagePath: 'https://zeerk.com/mod/uploads/2017/03/book-1024x793.jpg',
        title: 'Book',
        description: 'awesome book to read',
        price: 10
    }),
];

var done = 0;
for (var i = 0; i < products.length; i++){
    products[i].save(function () {
        done++;
        if (done === products.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
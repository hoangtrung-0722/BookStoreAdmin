const bookModel = require('../models/bookModel');

module.exports.index = (req, res, next) => {
    res.render('index', {title: 'Admin'});
};

module.exports.table = (req, res, next) => {
    const book = bookModel.list();
    res.render('tables', {title: 'Book Tables', book});
};
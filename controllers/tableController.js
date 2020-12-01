const bookModel = require('../models/bookModel');

module.exports.index = (req, res) =>{
    const book = bookModel.list();
    res.render('list_book', {book});
};

module.exports.detail = (req, res) =>{
    const book = bookModel.list();
    res.render('tables', {book});
};
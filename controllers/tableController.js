const bookModel = require('../models/bookModel');

module.exports.tables = (req, res) =>{
    const book = bookModel.list();
    res.render('tables', {book});
};
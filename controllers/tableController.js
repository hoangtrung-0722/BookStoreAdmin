const bookModel = require('../models/bookModel');

module.exports.tables = async (req, res) => {
    const books = await bookModel.list();
    console.log("Get book list")
    res.render('tables', {title: 'Table List', books});
};
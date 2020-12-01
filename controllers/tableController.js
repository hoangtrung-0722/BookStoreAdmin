const bookModel = require('../models/bookModel');

module.exports.tables = async (req, res) => {
    const books = await bookModel.list();
    res.render('tables', {title: 'Table List', books});
};

module.exports.deleteRow = (req, res) => {
    bookModel.delete(req.params.id);
    res.redirect("/tables");
}
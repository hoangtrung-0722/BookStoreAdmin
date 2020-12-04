const bookModel = require('../models/bookModel');

module.exports.tables = async (req, res) => {
    const books = await bookModel.list();
    res.render('tables', {title: 'Table List', books});
};

module.exports.tableEdit = async (req, res) => {
    const book = await bookModel.get(req.params.id);
    res.render('table_edit', {title: 'Update Book', book});
}

module.exports.deleteRow = (req, res) => {
    bookModel.delete(req.params.id);
    res.redirect('/tables');
}

module.exports.updateRow = (req, res) => {
    console.log(req.params.id);
    bookModel.update(req.params.id, req.body);
    res.redirect('/tables');
}
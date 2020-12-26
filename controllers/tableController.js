const bookService = require('../models/services/bookService');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mv = require('mv');

module.exports.tables = async (req, res) => {
    const page = +req.query.page || 1; //try catch
    const data = await bookService.getPage(page);
    res.render('tables', {
        title: 'Table List',
        data});
};

module.exports.tableEdit = async (req, res) => {
    const book = await bookService.get(req.params.id);
    res.render('table_edit', { title: 'Update Book', book });
}

module.exports.tableInsert = async (req, res) => {
    res.render('table_insert', { title: 'Insert Book' });
}

module.exports.deleteRow = (req, res) => {
    bookService.delete(req.params.id);
    res.redirect('/tables');
}

module.exports.updateRow = (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {

        if (err) {
            next(err);
            return;
        }
        const first_cover = files.first_cover;
        if (first_cover && first_cover.size > 0) {
            const file_name = first_cover.path.split('\\').pop() + '.' + first_cover.name.split('.').pop();
            fs.renameSync(first_cover.path, __dirname + '/../public/assets/img/book_cover/' + file_name);
            fields.first_cover = '/assets/img/book_cover/' + file_name;
        }
        bookService.update(req.params.id, fields).then(() => {
            res.redirect('/tables');
        })

    });


}

module.exports.insertRow = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        console.log(fields);
        if (err) {
            next(err);
            return;
        }
        
        const coverFirst = files.coverFirst;
        if (coverFirst && coverFirst.size > 0) {
            const file_name = coverFirst.path.split('\\').pop() + '.' + coverFirst.name.split('.').pop();
            mv(coverFirst.path, path.join(__dirname, '../public/assets/img/book_cover', file_name), { mkdirp: true }, function (err) { });
            fields.coverFirst = '/assets/img/book_cover/' + file_name;
        }
        const coverSecond = files.coverSecond;
        if (coverSecond && coverSecond.size > 0) {
            const file_name = coverSecond.path.split('\\').pop() + '.' + coverSecond.name.split('.').pop();
            mv(coverSecond.path, path.join(__dirname, '../public/assets/img/book_cover', file_name), { mkdirp: true }, function (err) { });
            fields.coverSecond = '/assets/img/book_cover/' + file_name;
        }
        console.log(fields);
        bookService.insert(fields).then(() => {
            res.redirect('/tables');
        })
    });
}
const bookService = require('../models/services/bookService');
const Category = require('../models/Category');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const mv = require('mv');

module.exports.books = async (req, res) => {
    var page = 1;
    try {
        page = +req.query.page || 1;
    } catch (err) {
        console.error(err);
        res.redirect('back');
    }
    const data = await bookService.getPage(page);
    res.render('table_books', { title: 'Books List', data });
};

module.exports.openBookEdit = async (req, res) => {
    const book = await bookService.get(req.params.id);
    const categories = await Category.find();
    res.render('book_edit', { title: 'Update Book', book, categories });
}

module.exports.openBookInsert = async (req, res) => {
    const categories = await Category.find();
    res.render('book_insert', { title: 'Insert New Book', categories });
}

module.exports.deleteBook = (req, res) => {
    bookService.delete(req.params.id);
    res.redirect('/table_books');
}

module.exports.updateBook = (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {

        if (err) {
            next(err);
            return;
        }
        const cover_image = files.image;
        if (cover_image && cover_image.size > 0) {
            const file_name = cover_image.path.split('\\').pop() + '.' + cover_image.name.split('.').pop();
            fs.renameSync(cover_image.path, __dirname + '/../public/assets/img/book_cover/' + file_name);
            fields.cover_image = '/assets/img/book_cover/' + file_name;
        }
        console.log(fields);
        bookService.update(req.params.id, fields).then(() => {
            res.redirect('/table_books');
        })

    });


}

module.exports.insertBook = async (req, res) => {
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
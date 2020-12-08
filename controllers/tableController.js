const bookModel = require('../models/bookModel');
const formidable = require('formidable');
const fs = require('fs');

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
    const form = formidable({ multiples: true });
 
    form.parse(req, (err, fields, files) => {

        if (err) {
        next(err);
        return;
        }
        const first_cover = files.first_cover;
        if (first_cover && first_cover.size > 0){
            const file_name = first_cover.path.split('\\').pop() + '.' + first_cover.name.split('.').pop();
            fs.renameSync(first_cover.path, __dirname + '/../public/assets/img/book_cover/' + file_name);
            fields.first_cover = '/assets/img/book_cover/' + file_name;
        }


        bookModel.update(req.params.id, fields).then(() =>{
            res.redirect('/tables');
        })
    
    });

    
}

module.exports.tableInsert = async (req, res) => {
    
    res.render('table_insert');
}
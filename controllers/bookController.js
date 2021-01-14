const bookService = require('../models/services/bookService');
const Category = require('../models/Category');
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const Book = require('../models/Book');
const mongoose = require('mongoose');

module.exports.books = async (req, res) => {
    var page = 1;
    const q = req.query.q;
    try {
        page = +req.query.page || 1;
    } catch (err) {
        console.error(err);
        res.redirect('back');
    }
    let data;
    if(!q){
        data = await bookService.getPage(page);
    } else{
        data = await bookService.search(page, q);
    }
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

module.exports.updateBook = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const uniqueString = req.params.id;
        const images = [files.image_0, files.image_1, files.image_2];
        fields.images = new Array();
        const imageUrls = await Book.aggregate()
            .match({
                _id: mongoose.Types.ObjectId(uniqueString)
            })
            .limit(1)
            .project({
                _id: 0,
                images: 1
            });
        for (const [i, image] of images.entries()) {
            if (image && image.size > 0) {
                const newName = image.path.split('\\').pop();
                const file_name = newName + uniqueString + '.' + image.name.split('.').pop();
                const newPath = path.join(image.path.slice(0, image.path.lastIndexOf('\\')), file_name);
                fs.renameSync(image.path, newPath);
                if (typeof (imageUrls[0].images[i]) != 'undefined') {
                    const public_id = 'book_images/' + path.parse(imageUrls[0].images[i]).name;
                    await cloudinary.api.delete_resources(public_id, function(err, result) {
                        if (err) {
                            return;
                        }
                    })
                }
                response = await uploadCloudinary(newPath);
                fields.images.push(response.secure_url);
            } else {
                if (typeof (imageUrls[0].images[i]) != 'undefined') {
                    fields.images.push(imageUrls[0].images[i]);
                } else {
                    fields.images.push('');
                }
            }
        }

        bookService.update(req.params.id, fields).then(() => {
            res.redirect('/table_books');
        });
    });
}

module.exports.insertBook = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        if (!fields.sale) {
            fields.sale = 0;
        }
        const uniqueString = req.params.id;
        const images = [files.image_0, files.image_1, files.image_2];
        fields.images = new Array();
        for (const image of images) {
            if (image && image.size > 0) {
                const newName = image.path.split('\\').pop();
                const file_name = newName + uniqueString + '.' + image.name.split('.').pop();
                const newPath = path.join(image.path.slice(0, image.path.lastIndexOf('\\')), file_name);
                fs.renameSync(image.path, newPath);
                response = await uploadCloudinary(newPath);
                fields.images.push(response.secure_url);
            } else {
                fields.images.push('');

            }
        }

        bookService.insert(req.params.id, fields).then(() => {
            res.redirect('/table_books');
        });
    });
}

const uploadCloudinary = async function (path) {
    return await cloudinary.uploader.upload(path,
        { upload_preset: 'book_preset', use_filename: true, resource_type: 'image' },
        function (err) {
            if (err) {
                next(err);
            }
            fs.unlinkSync(path);
        });
}
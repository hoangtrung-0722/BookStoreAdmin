const mongoose = require('mongoose');
const database = require('../dal/database');

const bookSchema = new mongoose.Schema ({
    name: String,
    label: String,
    price: String,
    cover: String,
}, { collection: 'books' });

module.exports = mongoose.model('BookModel', bookSchema);

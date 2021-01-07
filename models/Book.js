const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema ({
    name: String,
    label: String,
    image: String,
    price: Number,
    image: String,
    sale: Number,
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Book', bookSchema);

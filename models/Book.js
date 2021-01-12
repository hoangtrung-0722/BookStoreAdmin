const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    images: [String],
    price: {type: Number, min: 0},
    sale: {type: Number, default: 0, min: 0, max: 100},
    description: String,
    isDeleted: {type: Boolean, default: false},
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

bookSchema.pre('updateOne', async function(next) {
    this._update.$set.updatedAt = Date.now();
    next();
})

module.exports = mongoose.model('Book', bookSchema);

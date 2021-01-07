const Book = require('../Book');
const mongoose = require('mongoose');
const Category = require('../Category');

const ITEM_PER_PAGE = 10;

const totalPage = async (filter = {}) => {
    const count = await Book.countDocuments(filter);
    return Math.ceil(count / ITEM_PER_PAGE);
}

exports.list = async () => {
    const books = await Book.find({});
    return books;
}

exports.get = async (id) => {
    const book = await Book.findOne({_id: new mongoose.Types.ObjectId(id)}).populate('category');
    return book;
}

exports.delete = async (id) => {
    await Book.deleteOne({_id: new mongoose.Types.ObjectId(id)});
}

exports.update = async (id, updatedBook) => {
    await Book.updateOne({_id: new mongoose.Types.ObjectId(id)}, {"$set": updatedBook});
}

exports.insert = async (id, insertBook) => {
    await Book.insertOne({_id: new mongoose.Types.ObjectId(id)}, {"$set": insertBook});
}

exports.getPage = async (page) => {
    const total = await totalPage();
    const books = await Book.find()
                                 .skip(ITEM_PER_PAGE * (page - 1))
                                 .limit(ITEM_PER_PAGE)
                                 .populate('category');
    const categories = await Category.find();
    return {
        books: books,
        categories: categories,
        prevPrevPage: page > 2 ? page - 2 : undefined,
        prevPage: page > 1 ? page - 1 : undefined,
        currentPage: page,
        nextPage: page < total ? page + 1 : undefined,
        nextNextPage: page < total - 1 ? page + 2 : undefined,
        totalPage: total
    };
}
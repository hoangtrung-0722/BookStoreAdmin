const BookModel = require('../bookSchema');
const mongoose = require('mongoose');

const ITEM_PER_PAGE = 2;

const totalPage = async (filter = {}) => {
    const count = await BookModel.countDocuments(filter);
    return Math.ceil(count / ITEM_PER_PAGE);
}

exports.list = async () => {
    const books = await BookModel.find({});
    return books;
}

exports.get = async (id) => {
    const book = await BookModel.findOne({_id: new mongoose.Types.ObjectId(id)})
    return book;
}

exports.delete = async (id) => {
    await BookModel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
}

exports.update = async (id, updatedBook) => {
    await BookModel.updateOne({_id: new mongoose.Types.ObjectId(id)}, {"$set": updatedBook});
}

exports.insert = async (id, insertBook) => {
    await BookModel.insertOne({_id: new mongoose.Types.ObjectId(id)}, {"$set": insertBook});
}

exports.getPage = async (page) => {
    const total = await totalPage();
    const books = await BookModel.find()
                                 .skip(ITEM_PER_PAGE * (page - 1))
                                 .limit(ITEM_PER_PAGE);
    return {
        books: books,
        prevPrevPage: page > 2 ? page - 2 : undefined,
        prevPage: page > 1 ? page - 1 : undefined,
        currentPage: page,
        nextPage: page < total ? page + 1 : undefined,
        nextNextPage: page < total - 1 ? page + 2 : undefined,
        totalPage: total
    };
}
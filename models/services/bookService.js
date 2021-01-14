const Book = require('../Book');
const mongoose = require('mongoose');
const Category = require('../Category');

const ITEM_PER_PAGE = 10;

const DEFAULT_FILTERS = {isDeleted: false};

const totalPage = async (filter = DEFAULT_FILTERS) => {
    const count = await Book.countDocuments(filter);
    return Math.ceil(count / ITEM_PER_PAGE);
}

exports.list = async (filter = DEFAULT_FILTERS) => {
    const books = await Book.find(filter);
    return books;
}

exports.get = async (id) => {
    const book = await Book.findOne({_id: new mongoose.Types.ObjectId(id)}).populate('category');
    return book;
}

exports.delete = async (id) => {
    const book = await Book.findOne({_id: new mongoose.Types.ObjectId(id)});
    book.isDeleted = true;
    // await Book.updateOne({_id: new mongoose.Types.ObjectId(id)}, {"$set": book});
    await book.save();
}

exports.update = async (id, updatedBook) => { 
    updatedBook._id = id;
    const category = await Category.findOne({name: updatedBook.category});
    updatedBook.category = category._id;
    await Book.updateOne({_id: new mongoose.Types.ObjectId(id)}, {"$set": updatedBook});
}

exports.insert = async (id, insertBook) => {
    const category = await Category.findOne({name: insertBook.category});
    insertBook.category = category._id;
    const newBook = new Book(insertBook);
    //await newBook.save();
}

exports.getPage = async (page, filter = DEFAULT_FILTERS) => {
    filter.isDeleted = false;
    const total = await totalPage();
    const books = await Book.find(filter)
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

exports.search = async (page, q, filter = DEFAULT_FILTERS) =>{
    filter.isDeleted = false;
    filter.name = {'$regex': q, $options:"$i"};

    const total = await totalPage();
    const books = await Book.find(filter)
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


exports.azSort = async (sort, filter = DEFAULT_FILTERS) =>{
    filter.isDeleted = false;

    const total = await totalPage();
    const books = await Book.find(filter)
                                .sort({name: sort})
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
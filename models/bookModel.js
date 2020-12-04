const {db} = require('../dal/database');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    const booksCollection = db().collection('books');
    const books = await booksCollection.find({}).toArray();
    return books;
}

exports.get = async (id) => {
    const booksCollection = db().collection('books');
    const book = await booksCollection.findOne({_id: ObjectId(id)})
    return book;
}

exports.delete = async (id) => {
    const booksCollection = db().collection('books');
    await booksCollection.deleteOne({_id: new ObjectId(id)});
}

exports.update = async (id, updatedBook) => {
    const booksCollection = db().collection('books');
    await booksCollection.updateOne({_id: new ObjectId(id)}, {"$set": updatedBook});
}
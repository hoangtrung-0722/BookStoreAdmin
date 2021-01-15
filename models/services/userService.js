const Users = require('../User');
const mongoose = require('mongoose');

const ITEM_PER_PAGE = 10;

const totalUserPage = async () => {
    const count = await Users.countDocuments();
    return Math.ceil(count / ITEM_PER_PAGE);
}

exports.list = async () => {
    const users = await Users.find();
    return users;
}

exports.get = async (id) => {
    const user = await Users.findOne({_id: new mongoose.Types.ObjectId(id)});
    return user;
}

exports.getPage = async (page) => {
    const users = await Users.find({isAdmin: false})
                                 .skip(ITEM_PER_PAGE * (page - 1))
                                 .limit(ITEM_PER_PAGE);
    const total = await totalUserPage();
    return {
        users: users,
        prevPrevPage: page > 2 ? page - 2 : undefined,
        prevPage: page > 1 ? page - 1 : undefined,
        currentPage: page,
        nextPage: page < total ? page + 1 : undefined,
        nextNextPage: page < total - 1 ? page + 2 : undefined,
        totalPage: total
    };
}

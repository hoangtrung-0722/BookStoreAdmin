const mongoose = require('mongoose');

const userService = require('../models/services/userService');
const Users = require('../models/Users');

module.exports.users = async (req, res) => {
    var page = 1;

    try {
        page = +req.query.page || 1;
    } catch (err) {
        console.error(err);
        res.redirect('back');
    }
    let data = await userService.getPage(page);

    res.render('table_users', { title: 'Users List', data });
};
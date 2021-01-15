const mongoose = require('mongoose');

const userService = require('../models/services/userService');

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

module.exports.detail = async (req, res) => {
    let data = await userService.get(req.params.id);
    res.render('user_detail', { title: 'Users Detail', data });
};
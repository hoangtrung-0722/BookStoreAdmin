const bookService = require('../models/services/bookService');

module.exports.dashboard = (req, res, next) => {
    res.render('dashboard', {title: 'Admin'});
};
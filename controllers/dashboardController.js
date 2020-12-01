const bookModel = require('../models/bookModel');

module.exports.dashboard = (req, res, next) => {
    res.render('dashboard', {title: 'Admin'});
};
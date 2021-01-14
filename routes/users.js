var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/table_users', userController.users);
router.get('/user_detail/:id', userController.detail);


module.exports = router;

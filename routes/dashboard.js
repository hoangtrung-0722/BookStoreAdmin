const express = require('express');
const router = express.Router();
const indexController = require("../controllers/dashboardController")

router.get('/', indexController.dashboard);
router.get('/dashboard', indexController.dashboard);

module.exports = router;

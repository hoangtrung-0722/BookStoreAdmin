const express = require('express');
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

/*Home/Dashboard route*/
router.get('/', dashboardController.dashboard);
router.get('/dashboard', dashboardController.dashboard);
router.get('/index', dashboardController.dashboard);

module.exports = router;
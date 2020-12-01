const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');

router.get('/', tableController.index);

router.get('/tables', tableController.detail);

module.exports = router;
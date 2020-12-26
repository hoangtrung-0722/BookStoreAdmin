const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');

router.get('/', tableController.tables);
router.get('/table_edit/:id', tableController.tableEdit);
router.get('/table_insert', tableController.tableInsert);
router.post('/delete/:id', tableController.deleteRow);
router.post('/update/:id', tableController.updateRow);
router.post('/insert', tableController.insertRow);

module.exports = router;
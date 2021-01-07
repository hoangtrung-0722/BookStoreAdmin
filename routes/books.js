const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/', bookController.books);
router.get('/table_books', bookController.books);
router.get('/book_edit/:id', bookController.openBookEdit);
router.get('/book_insert', bookController.openBookInsert);
router.post('/delete/:id', bookController.deleteBook);
router.post('/update/:id', bookController.updateBook);
router.post('/insert', bookController.insertBook);

module.exports = router;
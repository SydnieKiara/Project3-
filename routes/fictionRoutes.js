const express = require('express');
const { createFictionBook } = require('../controllers/fictionController');
const { validateBookData } = require('../middleware/validation');

const router = express.Router();

/**
 * POST /fiction
 * Create a new fiction book
 */
router.post('/', validateBookData, createFictionBook);

module.exports = router;

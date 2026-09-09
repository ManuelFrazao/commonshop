const express = require('express');

const { CreateCategory } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', CreateCategory);

module.exports = router;
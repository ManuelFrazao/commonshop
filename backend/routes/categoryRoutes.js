const express = require('express');

const { CreateCategory, GetCategories } = require('../controllers/categoryController');
const { paginationValidation } = require('../middleware/paginationValidation');
const { categoryValidation } = require('../middleware/categoryValidation');

const router = express.Router();

router.post('/', categoryValidation, CreateCategory);
router.get('/', paginationValidation, GetCategories);

module.exports = router;
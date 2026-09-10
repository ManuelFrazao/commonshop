const express = require('express');

const { CreateProduct, GetProducts, GetActiveProducts } = require('../controllers/productController');
const { paginationValidation } = require('../middleware/paginationValidation');
const { productValidation} = require('../middleware/productValidation');

const router = express.Router();

router.post('/', productValidation, CreateProduct);
router.get('/', paginationValidation, GetProducts);
router.get('/active', paginationValidation, GetActiveProducts);

module.exports = router;
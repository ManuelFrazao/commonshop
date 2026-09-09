const express = require('express');

const { CreateProduct } = require('../controllers/productController');

const router = express.Router();

router.post('/', CreateProduct);

module.exports = router;
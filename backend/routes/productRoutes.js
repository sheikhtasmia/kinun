const express = require('express');
const router = express.Router();
const { getProducts, getProductById, searchProducts } = require('../controllers/productController');

// GET /api/products?category=&subcategory=&search=&minPrice=&maxPrice=
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// GET /api/products/search?query=
router.get('/search/:query', searchProducts);

module.exports = router;

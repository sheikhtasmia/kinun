// productRoutes.js: Product API routes

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc Get all products & filter by category/subcategory/price/search
router.get('/', async (req, res) => {
    try {
        const { category, subcategory, minPrice, maxPrice, search } = req.query;
        let query = {};
        if (category) query.category = category;
        if (subcategory) query.subcategory = subcategory;
        if (minPrice || maxPrice) query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
        if (search) query.title = { $regex: search, $options: 'i' };
        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @desc Get product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(404).json({ error: "Product not found" });
    }
});

module.exports = router;

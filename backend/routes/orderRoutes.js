// orderRoutes.js: Order API routes

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const sendOrderEmail = require('../utils/sendOrderEmail');

// Create order (Cash on Delivery)
router.post('/', async (req, res) => {
    try {
        const { name, phone, address, products, userId } = req.body;
        // Create order
        const order = new Order({
            user: userId,
            name,
            phone,
            address,
            products
        });
        await order.save();

        // Email to admin
        await sendOrderEmail(order);

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get orders for admin (all orders)
router.get('/admin', async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product').populate('user');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get orders for customer (only their orders)
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).populate('products.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update order status (admin only)
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

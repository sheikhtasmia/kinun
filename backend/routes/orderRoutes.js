const express = require('express');
const router = express.Router();
const { createOrder, getCustomerOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { isAdmin, isAuth } = require('../middleware/auth');

// POST /api/orders
router.post('/', isAuth, createOrder);

// GET /api/orders/my (customer)
router.get('/my', isAuth, getCustomerOrders);

// GET /api/orders (admin)
router.get('/', isAdmin, getAllOrders);

// PATCH /api/orders/:id/status (admin)
router.patch('/:id/status', isAdmin, updateOrderStatus);

module.exports = router;

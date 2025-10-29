// sendOrderEmail.js: Utility to send order confirmation email to admin

const nodemailer = require('nodemailer');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

// Configure transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

/**
 * Sends an email with order details to admin.
 * @param {*} order 
 */
async function sendOrderEmail(order) {
    // Fetch product details
    let productsHtml = '';
    for (const item of order.products) {
        const product = await Product.findById(item.product);
        productsHtml += `<li>${product.title} (x${item.quantity}): $${product.price}</li>`;
    }

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: ADMIN_EMAIL,
        subject: 'New Order Received - Kinun Dot Com',
        html: `
            <h2>Order Details</h2>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <ul>${productsHtml}</ul>
            <p><strong>Status:</strong> ${order.status}</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendOrderEmail;

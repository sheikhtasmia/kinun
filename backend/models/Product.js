// Product.js: Product model

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: { type: String, required: true },
    subcategory: String,
    affiliateUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

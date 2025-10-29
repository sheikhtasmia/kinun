const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String },
  supplier: { type: String } // Affiliate supplier name
});

module.exports = mongoose.model('Product', productSchema);

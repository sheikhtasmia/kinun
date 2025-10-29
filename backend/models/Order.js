const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      title: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  status: { type: String, enum: ['Pending', 'Completed', 'Delivered'], default: 'Pending' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For customer dashboard
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

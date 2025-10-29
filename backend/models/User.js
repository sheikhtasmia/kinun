// User.js: User model for Kinun Dot Com

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: String,
    address: String,
    email: { type: String, unique: true },
    password: String, // Store hashed password
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

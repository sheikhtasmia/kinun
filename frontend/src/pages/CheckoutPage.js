import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const { cart, clearCart } = useContext(CartContext);
    const [form, setForm] = useState({ name: "", phone: "", address: "" });
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // Prepare order data
        const orderData = {
            name: form.name,
            phone: form.phone,
            address: form.address,
            products: cart.map(item => ({
                product: item._id,
                quantity: item.quantity
            }))
        };
        // Send order to backend
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        const data = await res.json();
        clearCart();
        navigate(`/order-confirmation/${data._id}`);
    }

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">Checkout</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-2">
                    <label>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required className="border px-2 py-1 w-full" />
                </div>
                <div className="mb-2">
                    <label>Phone Number</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} required className="border px-2 py-1 w-full" />
                </div>
                <div className="mb-2">
                    <label>Address</label>
                    <textarea name="address" value={form.address} onChange={handleChange} required className="border px-2 py-1 w-full" />
                </div>
                <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Place Order (COD)</button>
            </form>
        </div>
    );
}

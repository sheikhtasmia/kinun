import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useContext(CartContext);
    const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <div>Your cart is empty.</div>
            ) : (
                <div>
                    {cart.map(item => (
                        <div key={item._id} className="flex items-center gap-4 mb-2">
                            <img src={item.image} alt={item.title} className="h-12 w-12 object-cover" />
                            <div>{item.title} (x{item.quantity})</div>
                            <div>${item.price * item.quantity}</div>
                            <button className="ml-auto text-red-600" onClick={() => removeFromCart(item._id)}>Remove</button>
                        </div>
                    ))}
                    <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>
                    <Link to="/checkout" className="bg-blue-700 text-white px-4 py-2 rounded mt-4 inline-block">Checkout</Link>
                    <button className="ml-4 bg-gray-300 px-3 py-1 rounded"
                        onClick={clearCart}>Clear Cart</button>
                </div>
            )}
        </div>
    );
}

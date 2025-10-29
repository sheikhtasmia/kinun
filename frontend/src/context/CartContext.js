import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Add product to cart
    function addToCart(product) {
        setCart(prev => {
            const existing = prev.find(p => p._id === product._id);
            if (existing) {
                return prev.map(p =>
                    p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(productId) {
        setCart(prev => prev.filter(p => p._id !== productId));
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

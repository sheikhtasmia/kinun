import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function OrderConfirmationPage() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetch(`/api/orders/${orderId}`)
            .then(res => res.json())
            .then(setOrder);
    }, [orderId]);

    if (!order) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">Order Confirmation</h1>
            <div>Name: {order.name}</div>
            <div>Phone: {order.phone}</div>
            <div>Address: {order.address}</div>
            <div>Status: {order.status}</div>
            <h2 className="font-bold mt-4">Products:</h2>
            <ul>
                {order.products.map(item => (
                    <li key={item._id}>
                        {item.product.title} (x{item.quantity}) - ${item.product.price * item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

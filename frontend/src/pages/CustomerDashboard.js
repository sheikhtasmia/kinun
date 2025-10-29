import React, { useEffect, useState } from 'react';

export default function CustomerDashboard() {
    // For demo, assume user ID is 1
    const userId = "1";
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`/api/orders/user/${userId}`)
            .then(res => res.json())
            .then(setOrders);
    }, [userId]);

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">My Orders</h1>
            {orders.length === 0 ? <div>No orders found.</div> : (
                <table className="w-full border">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{order.status}</td>
                                <td>
                                    <ul>
                                        {order.products.map(item => (
                                            <li key={item._id}>
                                                {item.product.title} (x{item.quantity})
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

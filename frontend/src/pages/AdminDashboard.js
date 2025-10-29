import React, { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch('/api/orders/admin')
            .then(res => res.json())
            .then(setOrders);
    }, []);

    async function updateStatus(id, status) {
        await fetch(`/api/orders/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
    }

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">Admin Orders</h1>
            <select className="mb-2 px-2 py-1 border" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Delivered">Delivered</option>
            </select>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Products</th>
                        <th>Status</th>
                        <th>Change Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.filter(order => !filter || order.status === filter).map(order => (
                        <tr key={order._id}>
                            <td>{order.name}</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>
                            <td>
                                <ul>
                                    {order.products.map(item => (
                                        <li key={item._id}>{item.product.title} (x{item.quantity})</li>
                                    ))}
                                </ul>
                            </td>
                            <td>{order.status}</td>
                            <td>
                                <select value={order.status} onChange={e => updateStatus(order._id, e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

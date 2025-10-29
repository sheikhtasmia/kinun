import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                // Extract categories for homepage
                setCategories([...new Set(data.map(p => p.category))]);
            });
    }, []);

    // Simple featured carousel
    const featured = products.slice(0, 4);

    return (
        <div>
            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border px-2 py-1 w-full"
                />
            </div>
            {/* Carousel */}
            <div className="mb-8">
                <h2 className="font-bold text-lg mb-2">Featured Products</h2>
                <div className="flex gap-4 overflow-x-auto">
                    {featured.map(p => (
                        <Link key={p._id} to={`/product/${p._id}`} className="min-w-[200px]">
                            <img src={p.image} alt={p.title} className="h-32 w-32 object-cover" />
                            <div className="mt-2">{p.title}</div>
                            <div className="text-blue-700 font-bold">${p.price}</div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* Categories */}
            <div className="mb-6">
                <h2 className="font-bold text-lg mb-2">Shop by Category</h2>
                <div className="flex gap-4">
                    {categories.map(cat => (
                        <Link to={`/category/${cat}`} key={cat} className="bg-gray-200 py-2 px-4 rounded hover:bg-blue-100">
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>
            {/* Product Grid */}
            <div>
                <h2 className="font-bold text-lg mb-2">All Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products
                        .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
                        .map(p => (
                            <Link key={p._id} to={`/product/${p._id}`} className="border p-2 rounded">
                                <img src={p.image} alt={p.title} className="h-24 w-full object-cover" />
                                <div className="mt-1 font-bold">{p.title}</div>
                                <div>${p.price}</div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
}

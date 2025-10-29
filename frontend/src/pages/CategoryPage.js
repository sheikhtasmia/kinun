import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    useEffect(() => {
        let url = `/api/products?category=${category}`;
        if (minPrice) url += `&minPrice=${minPrice}`;
        if (maxPrice) url += `&maxPrice=${maxPrice}`;
        fetch(url)
            .then(res => res.json())
            .then(setProducts);
    }, [category, minPrice, maxPrice]);

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4">{category}</h1>
            <div className="mb-2 flex gap-2">
                <input type="number" placeholder="Min Price" value={minPrice}
                    onChange={e => setMinPrice(e.target.value)} className="border px-2 py-1" />
                <input type="number" placeholder="Max Price" value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)} className="border px-2 py-1" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(p => (
                    <Link key={p._id} to={`/product/${p._id}`} className="border p-2 rounded">
                        <img src={p.image} alt={p.title} className="h-24 w-full object-cover" />
                        <div className="mt-1 font-bold">{p.title}</div>
                        <div>${p.price}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

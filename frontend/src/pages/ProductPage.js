import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(res => res.json())
            .then(setProduct);
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="max-w-md mx-auto">
            <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
            <h1 className="text-2xl font-bold mt-2">{product.title}</h1>
            <div className="text-blue-700 font-bold text-xl">${product.price}</div>
            <div className="mt-2">{product.description}</div>
            <button
                className="mt-4 bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer" className="block mt-2 text-sm text-blue-600 underline">
                Buy from Affiliate
            </a>
        </div>
    );
}
